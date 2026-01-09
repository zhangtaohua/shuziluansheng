<template>
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
            v-model:value="cssCode"
            language="css"
            theme="vs-dark"
            :options="editorOptions"
            @editorDidMount="editorDidMountHd"
            @change="editorChangeHd"
          />
        </div>
        <div v-show="currentTabName == htmlTabNames[1].value" class="col_nw_fs_fs rparams_in_body_wraper">
          <CzmlPackagesRender :vdata="editorComponents.currentComp"></CzmlPackagesRender>
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
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref, watch } from "vue";
  import { CodeEditor } from "monaco-editor-vue3";
  import * as monaco from "monaco-editor";
  import { ElMessage } from "element-plus";
  import { parse as cssParse, stringify } from "@adobe/css-tools";
  import OpenAI from "openai";
  import { kebabCase, camelCase, escapeRegExp } from "es-toolkit";

  import { useEditorComponentstore } from "@/stores/editorConfig";
  import { Position, Microphone } from "@element-plus/icons-vue";

  const { editorComponents } = useEditorComponentstore();

  const emits = defineEmits(["unExpand"]);
  const currentComp = ref(null);
  const askQuestion = ref("");

  const questionList = ref([]);
  let questionData: any = null;

  const isWaitingAnswer = ref(false);
  const questionIndex = ref(-1);

  let mediaRecorder: any = null;
  let mediaStream: any = null;
  let recordedBlobs: any = [];

  const soundTime = 0;
  const soundTimer = null;
  const audioQueue = [];

  const htmlTabNames = [
    { id: "code", value: "code", labelZh: "Code", labelEn: "Code" },
    { id: "control", value: "control", labelZh: "样式", labelEn: "Style" },
    { id: "data", value: "data", labelZh: "数据", labelEn: "Data" },
  ];
  const currentTabName = ref(htmlTabNames[1].value);
  const changeTabName = (tab: any) => {
    currentTabName.value = tab.value;
  };

  const editorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    automaticLayout: true,
  };

  const cssCode = ref("");
  const codeEditorRef = ref(null);
  let codeEditorIns = null;

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

  // 方法1：通过编辑器服务获取
  const getHoverContent = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // 获取当前位置
    const position = editor.getPosition();
    const model = editor.getModel();

    if (!position || !model) return;

    // 获取悬停提供者
    const hoverProvider = monaco.languages.getHoverProvider(model.getLanguageId());

    // 获取悬停内容
    hoverProvider.provideHover(model, position, {}).then((result) => {
      if (result) {
        // 提取内容
        const contents = result.contents;
        contents.forEach((content) => {
          if (typeof content === "string") {
            console.log("纯文本内容:", content);
          } else if (content.value) {
            // MarkdownString类型
            console.log("富文本内容:", content.value);

            // 解析类似图片中的内容
            // parseHoverContent(content.value);
          }
        });

        // 获取范围
        const range = result.range;
        console.log("悬停位置范围:", range);
      }
    });
  };

  const editorDidMountHd = (editor) => {
    codeEditorIns = editor;
    console.log("editorDidMountHd", editor);
    editor.addOverlayWidget({
      getId: () => "monaco.editor.ymj.overlay.widget",
      getDomNode: () => {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.zIndex = "9999";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        div.style.color = "white";
        div.style.padding = "5px";
        div.style.borderRadius = "5px";
        div.style.width = "200px";
        div.style.height = "200px";
        return div;
      },
      getPosition: () => {
        return {
          preference: monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
        };
      },
    });

    // editor.onMouseMove((e) => {
    //   // monaco.editor.MouseTargetType.CONTENT_TEXT：光标落在文本上 OUTSIDE_EDITOR
    //   console.log("onMouseMove", e, monaco);
    //   if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
    //     const model = editor.getModel();
    //     const position = e.target.position;
    //     const word = model.getWordAtPosition(position);
    //     const word2 = model.getWordUntilPosition(position);

    //     // const range = {
    //     //   startLineNumber: position.lineNumber,
    //     //   startColumn: word.startColumn,
    //     //   endLineNumber: position.lineNumber,
    //     //   endColumn: word.endColumn,
    //     // };

    //     console.log("光标位置", word, word2, position);
    //   }
    // });

    editor.onMouseDown((e) => {
      // monaco.editor.MouseTargetType.CONTENT_TEXT：光标落在文本上
      console.log("onMouseDown", e, monaco);
      if (e.target.type === monaco.editor.MouseTargetType.CONTENT_TEXT) {
        const model = editor.getModel();
        const position = e.target.position;
        const word = model.getWordAtPosition(position);
        const word2 = model.getWordUntilPosition(position);
        hideSuggestWidget();
        getHoverContent(codeEditorIns);

        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        };

        console.log("光标位置", word, word2, position);

        // 这个是删除文本
        // model.applyEdits([
        //   {
        //     range: range,
        //     text: "",
        //   },
        // ]);
      }
    });
  };

  const editorChangeHd = (editorCtx: string, event) => {
    if (codeEditorRef.value) {
      console.log("codeEditorRef.value", codeEditorRef.value, editorCtx, event);
      if (editorCtx) {
        let editorValue = editorCtx.slice(2, editorCtx.length);
        editorValue = replaceAll(editorValue, ";\r\n", ",\r\n");
        console.log("editorValue", editorValue);

        // const cssJson = JSON.parse(editorValue);
        const cssJson = cssParse(editorCtx);

        console.log("cssJson", cssJson);
        console.log("cssJson", cssJson.stylesheet.rules[0].declarations);

        // const styleSheet = new CSSStyleSheet(); // 创建一个样式表对象

        // 解析现有样式表的规则
        // for (const rule of document.styleSheets[0].cssRules) {
        //   if (rule instanceof CSSStyleRule) {
        //     console.log(rule.selectorText, rule.style.backgroundColor);
        //   }
        // }
        // console.log("styleSheet", styleSheet);
      }
    }
  };

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

  function unExpandClickHd() {
    emits("unExpand");
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

  .rparams_in_body_wraper {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    background-color: rgba(25, 25, 25, 1);
    padding: 1rem 0.25rem 1rem 0.5rem;
    border-radius: 0.25rem;
  }

  .rparams_in_body_actions {
    width: 100%;
    height: 2rem;
  }

  .rparams_in_body_item {
    width: 100%;
    height: auto;
  }

  .rparams_in_body_labelzh {
    width: max-content;
    height: 2rem;
    color: rgba(255, 255, 255, 1);
    font-size: var(--czml-fs-pp-zh);
    font-weight: bold;
    padding-left: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .rparams_in_body_code {
    width: 100%;
    height: 100%;
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
