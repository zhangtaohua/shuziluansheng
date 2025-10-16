const fs = require("fs");
const path = require("path");

/**
 * 递归获取目录下所有文件
 * @param {string} dir - 目录路径
 * @returns {string[]} 文件路径数组
 */
function getAllFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 递归读取子目录
      results = results.concat(getAllFiles(filePath));
    } else {
      results.push(filePath);
    }
  });

  return results;
}

/**
 * 主处理函数
 * @param {string} directory - 要处理的目录路径
 */
function processJSONFiles(directory) {
  try {
    // 获取目录下所有文件
    const allFiles = getAllFiles(directory);

    // 过滤出JSON文件
    const jsonFiles = allFiles.filter((file) => path.extname(file).toLowerCase() === ".json");

    console.log(`找到 ${jsonFiles.length} 个JSON文件`);

    // 用于存储所有properties的合并结果
    const mergedProperties = {};
    const unMergedProperties = {};
    let processedCount = 0;

    // 处理每个JSON文件
    jsonFiles.forEach((filePath) => {
      try {
        // 读取文件内容
        const fileContent = fs.readFileSync(filePath, "utf8");

        // 解析JSON
        const jsonData = JSON.parse(fileContent);

        // 检查是否存在properties对象
        if (jsonData.properties && typeof jsonData.properties === "object") {
          // 将properties中的键值对合并到结果对象中
          Object.assign(mergedProperties, jsonData.properties);
          const keys = Object.keys(jsonData.properties);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            console.log("key", key);
            if (unMergedProperties[key]) {
              let j = 1;
              while (true) {
                let newKey = key + j;
                console.log("newKey", newKey, unMergedProperties[newKey]);

                if (unMergedProperties[newKey]) {
                  j = j + 1;
                } else {
                  console.log("newKey2");
                  unMergedProperties[newKey] = jsonData.properties[key];
                  break;
                }
              }
            } else {
              unMergedProperties[key] = jsonData.properties[key];
            }
          }
          processedCount++;
          console.log(`已处理文件: ${path.basename(filePath)}`);
        }
      } catch (error) {
        console.error(`处理文件 ${filePath} 时出错:`, error.message);
      }
    });

    console.log(`成功处理 ${processedCount} 个文件的properties属性`);
    console.log(`合并后共有 ${Object.keys(mergedProperties).length} 个键值对`);

    // 创建结果对象
    const result = {
      mergedProperties: mergedProperties,
      summary: {
        totalFilesProcessed: processedCount,
        totalKeyValuePairs: Object.keys(mergedProperties).length,
        processedAt: new Date().toISOString(),
      },
    };

    const unMergeresult = {
      unmergedProperties: unMergedProperties,
      summary: {
        totalFilesProcessed: processedCount,
        totalKeyValuePairs: Object.keys(unMergedProperties).length,
        processedAt: new Date().toISOString(),
      },
    };

    // 写入结果文件
    // const outputPath = path.join(directory, "result.json");
    // fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

    const unmergeOutputPath = path.join(directory, "aaaunMergeResult.json");
    fs.writeFileSync(unmergeOutputPath, JSON.stringify(unMergeresult, null, 2), "utf8");

    console.log(`结果已写入: ${outputPath}`);
  } catch (error) {
    console.error("处理过程中发生错误:", error.message);
  }
}

// 使用示例：处理当前目录
const targetDirectory = process.argv[2] || "."; // 允许通过命令行参数指定目录
console.log(`开始处理目录: ${path.resolve(targetDirectory)}`);
processJSONFiles(targetDirectory);
