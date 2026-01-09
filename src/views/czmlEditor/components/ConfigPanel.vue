<template>
  <RightParamsEmbedWraper v-if="isCanShowConfigPanel" ref="RightParamsEmWraperRef">
    <div class="row_nw_ce_ce rparams_in_container">
      <div class="col_nw_fs_fs rparams_in_wrapper">
        <div class="col_nw_fs_fs rparams_in_header">
          <div class="row_nw_sb_ce rparams_in_header_tbox">
            <div class="row_nw_fs_ce rparams_in_header_title">参数配置</div>
            <div class="row_nw_fs_ce rparams_in_header_cimg">
              <el-icon class="rparams_in_header_cicon" size="1.25rem" @click="unExpandClickHd">
                <CircleClose />
              </el-icon>
            </div>
          </div>

          <div class="row_nw_ce_ce rparams_in_header_tabbox">
            <el-button
              v-for="htmlTab in htmlTabNames"
              :key="htmlTab.id"
              :type="currentTabName == htmlTab.value ? 'primary' : ''"
              plain
              @click="changeTabName(htmlTab)"
            >
              {{ htmlTab.labelZh }}
            </el-button>
          </div>
        </div>

        <div class="grave_gap"></div>

        <div class="col_nw_fs_ce rparams_in_body">
          <div v-show="currentTabName == htmlTabNames[0].value" class="rparams_in_body_code">
            <CodeEditor
              ref="codeEditorRef"
              v-model:value="czmlCode"
              language="json"
              theme="vs-dark"
              :options="editorOptions"
              @editorDidMount="editorDidMountHd"
              @change="editorChangeHd"
            />
          </div>
          <div v-show="currentTabName == htmlTabNames[1].value" class="col_nw_fs_fs rparams_in_body_wraper">
            <CzmlPackagesRender :vdata="currentCzmlData"></CzmlPackagesRender>
          </div>
        </div>

        <div class="grave_gap"></div>

        <div class="row_nw_fs_fe rparams_in_aibox">
          <div class="row_nw_fs_fs rparams_in_aiinputbox">
            <el-input
              v-model="askQuestion"
              style="width: 100%; height: 100%"
              :autosize="false"
              :rows="6"
              type="textarea"
              placeholder="Please input"
              @keyup.enter="handleSendAskQuestion"
            ></el-input>
          </div>
          <div class="row_nw_ce_ce rparams_in_aiaudiobox">
            <el-button :icon="Microphone" circle @mousedown="startRecording" @mouseup="stopRecording" />
          </div>

          <div class="row_nw_ce_ce rparams_in_aisend">
            <el-button :icon="Position" circle @click="handleSendAskQuestion" />
          </div>
        </div>
      </div>
    </div>
  </RightParamsEmbedWraper>
</template>

<script setup lang="ts">
  import { ref, watch, createApp, getCurrentInstance } from "vue";

  import RightParamsEmbedWraper from "@/components/wrapper/RightParamsEmbedWraper.vue";

  import { Position, Microphone } from "@element-plus/icons-vue";

  import { CodeEditor } from "monaco-editor-vue3";
  import * as monaco from "monaco-editor";
  import { ElMessage } from "element-plus";

  import { kebabCase, camelCase, escapeRegExp } from "es-toolkit";
  import { parse as cssParse, stringify } from "@adobe/css-tools";
  import OpenAI from "openai";

  import { globalCzmlMapData, useCzmlMapDataConfigStore, useCzmlStateStore } from "@/stores/czmlMapDataConfig";

  const { czmlState } = useCzmlStateStore();
  const currentVueIns = getCurrentInstance();
  console.log("currentVueIns", currentVueIns);
  // 当前选中的Czml数据
  const currentCzmlData = ref(null);

  // 右侧参数配置面板
  const RightParamsEmWraperRef = ref(null);
  // 是否显示右侧参数配置面板
  const isCanShowConfigPanel = ref(false);

  const askQuestion = ref("");
  const questionList = ref([]);
  // 用来组织接口请求问题数据的
  let questionData: any = null;

  const isWaitingAnswer = ref(false);
  const questionIndex = ref(-1); // 问题对的索引

  let mediaRecorder: any = null;
  let mediaStream: any = null;
  let recordedBlobs: any = [];

  const soundTime = 0;
  const soundTimer = null;
  const audioQueue = [];

  const htmlTabNames = [
    { id: "code", value: "code", labelZh: "Code", labelEn: "Code" },
    { id: "control", value: "control", labelZh: "控件配置", labelEn: "Control" },
  ];

  const currentTabName = ref(htmlTabNames[1].value);

  const changeTabName = (tab: any) => {
    currentTabName.value = tab.value;
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
    readOnly: true,
  };

  const czmlCode = ref("");
  let czmlCodeJsObj: any = null;
  const codeEditorRef = ref(null);
  let codeEditorIns = null;

  function unExpandClickHd() {
    if (RightParamsEmWraperRef.value) {
      RightParamsEmWraperRef.value.unExpandClickHd();
    }
  }

  function replaceAll(text: string, search: string, replacement: string): string {
    const escapedSearch = escapeRegExp(search);
    return text.replace(new RegExp(escapedSearch, "g"), replacement);
  }

  const hideSuggestWidget = () => {
    if (codeEditorIns) {
      const domNode = codeEditorIns.getDomNode();
      console.log("domNode", domNode);
      if (domNode) {
        const suggestWidget = domNode.querySelector(".overflowingContentWidgets");
        console.log("suggestWidget", suggestWidget);

        if (suggestWidget) {
          suggestWidget.style.display = "none";
        }
      }
    }
  };

  // const renderCzmlEntityProp = (position: any, propertyPath: string) => {
  //   if (codeEditorIns) {
  //     codeEditorIns.addOverlayWidget({
  //       getId: () => "monaco.editor.ymj.overlay.widget",
  //       getDomNode: () => {
  //         const div = document.createElement("div");
  //         div.style.position = "absolute";
  //         div.style.zIndex = "9999";
  //         div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  //         div.style.color = "white";
  //         div.style.padding = "5px";
  //         div.style.borderRadius = "5px";
  //         div.style.width = "200px";
  //         div.style.height = "200px";
  //         return div;
  //       },
  //       getPosition: () => {
  //         return {
  //           preference: monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
  //         };
  //       },
  //     });
  //   }
  // };

  const createVueDom = (vNode, vdata, editor) => {
    const overlayInstance = createApp(vNode, {
      vdata,
    });

    const parentDom = document.createElement("div");
    parentDom.style.position = "absolute";
    parentDom.style.zIndex = "9999";
    parentDom.style.backgroundColor = "rgba(45, 45, 45, 1)";
    parentDom.style.padding = "2.5rem 0.75rem 0.75rem 0.75rem";
    parentDom.style.borderRadius = "0.5rem";
    parentDom.style.width = "36rem";
    parentDom.style.height = "auto";
    parentDom.style.border = "1px solid rgba(255, 255, 255, 0.5)";

    const closeDom = document.createElement("div");
    closeDom.style.position = "absolute";
    closeDom.style.zIndex = "999";
    closeDom.style.color = "red";
    closeDom.style.height = "1.5rem";
    closeDom.style.top = "0.5rem";
    closeDom.style.right = "0.75rem";
    closeDom.style.cursor = "pointer";
    closeDom.style.fontSize = "1rem";
    closeDom.innerHTML = "×";

    closeDom.addEventListener("click", () => {
      editor.removeContentWidget({
        getId: () => "monaco.editor.rj.overlay.widget",
      });
    });

    const overlayInstanceReal = overlayInstance.mount(parentDom); //根据模板创建一个面板

    const vDom = overlayInstanceReal.$el;
    parentDom.appendChild(closeDom);
    // this.mapDomContainner!.appendChild(parentDom);

    return {
      parentDom,
      vDom,
    };
  };

  const renderCzmlEntityProp = (position: any, propertyPath: any) => {
    if (codeEditorIns) {
      const { id, path } = propertyPath;
      console.log("currentCzmlData", currentCzmlData.value);
      const packets = currentCzmlData.value.packets;
      if (!packets || packets.length === 0) {
        ElMessage.error("Czml数据中没有包含任何包");
        return;
      }
      const packet = packets.find((item: any) => {
        if (item.properties && item.properties.id.getCzmlValue() === id) {
          return true;
        } else {
          return false;
        }
      });

      if (!packet) {
        ElMessage.error("未找到对应的Czml数据");
        return;
      } else {
        let prop = packet.properties[path[0]];
        for (let i = 1; i < path.length; i++) {
          prop = prop.properties[path[i]];
        }

        codeEditorIns.removeContentWidget({
          getId: () => "monaco.editor.rj.overlay.widget",
        });

        console.log("packet", packet);

        codeEditorIns.addContentWidget({
          allowEditorOverflow: true,
          superMouseDown: true,
          getId: () => "monaco.editor.rj.overlay.widget",
          getDomNode: () => {
            const { parentDom, vDom } = createVueDom(
              currentVueIns.appContext.components[prop.tag],
              prop,
              codeEditorIns,
            );
            return parentDom;
          },
          getPosition: () => {
            return {
              position: {
                lineNumber: position.lineNumber,
                column: 0,
              },
              preference: [
                // monaco.editor.ContentWidgetPositionPreference.EXACT
                monaco.editor.ContentWidgetPositionPreference.BELOW,
              ],
            };
          },
        });
      }
    }
  };

  function analyzeJsonPath(czmlData, targetValue, targetPath = []) {
    for (const [key, value] of Object.entries(czmlData)) {
      if (value === targetValue) {
        return [...targetPath, key];
      } else if (Array.isArray(value)) {
        const index = value.indexOf(targetValue);
        if (index !== -1) {
          return [...targetPath, key, `[${index}]`];
        }
      } else if (typeof value === "object" && value !== null) {
        const result = analyzeJsonPath(value, targetValue, [...targetPath, key]);
        if (result) return result;
      }
    }
    return null;
  }

  function getPropertyPathSimple(model, position) {
    const lineContent = model.getLineContent(position.lineNumber);
    const path = [];
    let id = "";

    // 获取当前行的缩进层级
    const indentMatch = lineContent.match(/^(\s*)/);
    let indentLevel = indentMatch ? indentMatch[1].length / 2 : 0;

    const propertyMatchOut = lineContent.match(/"([^"]+)"\s*:/);
    if (propertyMatchOut) {
      path.unshift(propertyMatchOut[1]);
    }

    let currentLine = position.lineNumber - 1;

    // 向上遍历，根据缩进层级构建路径
    while (currentLine >= 0) {
      const line = model.getLineContent(currentLine + 1);
      const indentMatch = line.match(/^(\s*)/);

      const lineIndent = indentMatch ? indentMatch[1].length / 2 : 0;

      // 查找属性名
      const propertyMatch = line.match(/"([^"]+)"\s*:/);
      if (propertyMatch && lineIndent < indentLevel) {
        path.unshift(propertyMatch[1]);
        indentLevel = lineIndent;
      }
      if (propertyMatch && propertyMatch[1] == "id") {
        const propMatch2 = line.match(/"([^"]+)"\s*:\s*"([^"]+)"\s*/);
        id = propMatch2[2];
        // const lineArray = line.split(":");
        // if (lineArray.length >= 2) {
        //   let valueId = lineArray[1].trim();
        //   const tempId2 = valueId.match(/"([^"]+)"\s*/)[1];
        //   valueId = valueId.substring(1, valueId.length - 2);
        //   console.log("valueId", valueId, tempId2, valueId == tempid);
        // }
        // id = tempid;
        break;
      }

      // 如果缩进为0，到达根节点
      if (lineIndent === 0) break;

      currentLine--;
    }

    return {
      id,
      path,
    };
  }

  const editorDidMountHd = (editor: any) => {
    codeEditorIns = editor;
    console.log("editorDidMountHd", editor);

    editor.onMouseDown((e: any) => {
      // monaco.editor.MouseTargetType.CONTENT_TEXT：光标落在文本上
      // console.log("onMouseDown", e, e.target.type, monaco);
      console.log("onMouseDown", e, e.target.type);
      if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
        const model = editor.getModel();
        const position = e.target.position;
        // const word = model.getWordAtPosition(position);
        // const word2 = model.getWordUntilPosition(position);
        // hideSuggestWidget();
        const propertyPath = getPropertyPathSimple(model, position);

        console.log("光标位置", position, propertyPath);
        renderCzmlEntityProp(position, propertyPath);
      }
      if (
        e.target.type === monaco.editor.MouseTargetType.CONTENT_EMPTY ||
        e.target.type === monaco.editor.MouseTargetType.GUTTER_LINE_NUMBERS
      ) {
        editor.removeContentWidget({
          getId: () => "monaco.editor.rj.overlay.widget",
        });
      }

      // if (e.target.detail === "monaco.editor.rj.overlay.widget") {
      //   console.log("点击了overlay.widget", "rj");
      // }
    });
  };

  // 这个是应该不会触发的，因为readOnly 是只读的，不会触发change事件
  const editorChangeHd = (editorCtx: string, event) => {
    if (codeEditorRef.value) {
      console.log("codeEditorRef.value", codeEditorRef.value, editorCtx, event);
      if (editorCtx) {
      }
    }
  };

  watch(
    [() => czmlState.currentCzmlChildPropRefresh],
    () => {
      if (globalCzmlMapData.currentCzmlData && globalCzmlMapData.currentCzmlChildProp) {
        currentCzmlData.value = globalCzmlMapData.currentCzmlData;
        // czmlCodeJsObj = currentCzmlData.value.getCzmlData();
        // console.log("getCzmlData", czmlCodeJsObj);
        // czmlCode.value = JSON.stringify(czmlCodeJsObj, null, 2);
        isCanShowConfigPanel.value = true;
      } else {
        currentCzmlData.value = null;
        isCanShowConfigPanel.value = false;
      }
    },
    {
      deep: true,
      immediate: false,
    },
  );

  watch(
    currentCzmlData,
    () => {
      if (currentCzmlData.value) {
        czmlCodeJsObj = currentCzmlData.value.getCzmlData();
        console.log("getCzmlData", czmlCodeJsObj);
        czmlCode.value = JSON.stringify(czmlCodeJsObj, null, 2);
      } else {
        czmlCode.value = "";
      }
    },
    {
      deep: true,
      immediate: false,
    },
  );

  // 以下是AI 接口调用代码
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    dangerouslyAllowBrowser: true,
    apiKey: "sk-e602ada7e14844f38bcd464ed03ad793",
  });

  const handleSendAskQuestion = () => {
    if (!askQuestion.value) {
      return ElMessage({ type: "warning", message: "输入不能为空" });
    }
    questionData = {
      messages: [
        {
          role: "system",
          content: `你是非常专业前端开发CSS生成专家，要求：1、只返回有效的CSS代码，不包含任何解释。
          2、即使用户提示词中有需要，也绝对不要生成以下属性的css代码：["position", "display"]。
          3、复合的属性必须拆开来实现。
          3、必须按如下示例JSON格式返回:
            {
              ”width“: ”auto",
              "height": 100%,
              "border-bottom-left-radius": 0.75rem
            }
        `,
        },
        {
          role: "user",
          content: askQuestion.value,
        },
      ],
      model: "deepseek-chat",
      response_format: {
        type: "json_object",
      },
    };
    questionList.value.push({
      ask: {
        text: askQuestion.value,
      },
    });
    askQuestion.value = "";
    handleAskQuestion();
  };

  async function handleAskQuestion() {
    questionList.value.push({ answer: " " });
    isWaitingAnswer.value = true;
    questionIndex.value++;

    // 回答服务器推送形式的问题
    const completion = await openai.chat.completions.create(questionData);
    console.log("completion", completion);
    console.log(completion.choices[0].message.content);
    console.log(JSON.parse(completion.choices[0].message.content));
  }

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        mediaStream = stream;
        mediaRecorder = new MediaRecorder(stream);
        // soundTimer = setInterval(() => {
        //   soundTime++;
        // }, 1000);
        recordedBlobs = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
          }
        };
        mediaRecorder.start();
      })
      .catch(function (error) {
        console.error("getUserMedia error:", error);
      });
  }

  function stopRecording() {
    if (mediaStream && mediaStream.getAudioTracks().length > 0) {
      const track = mediaStream.getAudioTracks()[0];
      track.stop();
    }
    if (mediaRecorder) {
      mediaRecorder.addEventListener("stop", () => {
        // if (soundTime < 5) {
        //   clearInterval(soundTimer);
        //   soundTimer = null;
        //   soundTime;
        //   return ElMessage("语音录入时间太短");
        // }
        const formData = new FormData();
        formData.append("file", new Blob(recordedBlobs, { type: "audio/mp3" }));
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/drone/audio2Text", true);
        xhr.send(formData);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            recordedBlobs = [];
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText); // 返回的文本数据
              if (!response.text) {
                return ElMessage({ type: "warning", message: "未识别到语音" });
              }
              questionList.value.push({
                ask: {
                  text: response.text,
                },
              });
              questionData = { content: response.text };
              handleAskQuestion();
            } else {
              ElMessage({ type: "error", message: "接口报错" });
            }
          }
        };
      });
    }
  }
</script>

<style scoped>
  .rparams_in_container {
    width: 100%;
    height: 100%;
    background-color: rgba(26, 30, 39, 1);
    overflow: hidden;
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: -0.25rem 0 0.25rem rgba(255, 255, 255, 0.2);
  }

  .rparams_in_wrapper {
    width: calc(100% - 1.5rem);
    height: calc(100% - 3rem);
  }

  .rparams_in_header {
    width: 100%;
    height: auto;
  }

  .rparams_in_header_tbox {
    width: 100%;
    height: 2rem;
  }

  .rparams_in_header_title {
    width: max-content;
    height: 100%;
    color: rgba(255, 255, 255, 1);
    font-size: 1.25rem;
    flex-shrink: 0;
    font-weight: 700;
  }

  .rparams_in_header_cimg {
    width: 1.25rem;
    height: 2rem;
  }

  .rparams_in_header_cicon {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .rparams_in_header_tabbox {
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
  }

  .grave_gap {
    width: 100%;
    border: 0;
    border-bottom: 0.125rem groove rgba(125, 125, 125, 1);
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .rparams_in_body {
    width: 100%;
    height: calc(100% - 18rem);
    flex-shrink: 1;
    overflow-y: scroll;
    margin-bottom: 1rem;
    container-name: rparamsBody;
    container-type: inline-size;
  }

  .rparams_in_body::-webkit-scrollbar {
    display: none;
    width: 0px;
  }

  .rparams_in_body_code {
    width: 100%;
    height: 100%;
  }

  .rparams_in_body_wraper {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    background-color: rgba(25, 25, 25, 1);
    padding: 1rem 0.25rem 1rem 0.5rem;
    border-radius: 0.25rem;
  }

  .rparams_in_aibox {
    position: relative;
    width: 100%;
    height: 8.5rem;
    flex-shrink: 0;
  }

  .rparams_in_aiinputbox {
    width: 100%;
    height: 100%;
  }

  .rparams_in_aiaudiobox {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    bottom: 0.5rem;
    right: 3rem;
  }

  .rparams_in_aisend {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }

  @container rparamsBody (max-width: 280px) {
  }
</style>
