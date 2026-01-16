interface ExportResult {
  success: boolean;
  filename?: string;
  size?: number;
  error?: string;
  timestamp?: string;
}

interface DownloadOptions {
  filename?: string;
  formatted?: boolean;
  replacer?: (key: string, value: any) => any;
  space?: string | number;
  autoBom?: boolean;
  onSuccess?: (result: ExportResult) => void;
  onError?: (error: ExportResult) => void;
}

/**
 * 将对象导出为JSON文件并下载
 * @param {Object} data - 要导出的对象
 * @param {string} filename - 文件名（可选，默认为当前时间戳）
 * @param {boolean} formatted - 是否格式化JSON（可选，默认为true）
 */
export function exportJsonToFile(data: any, filename = null, formatted = true) {
  try {
    // 验证输入
    if (data === null || data === undefined) {
      throw new Error("导出的数据不能为空");
    }

    // 将数据转换为JSON字符串
    const jsonString = formatted
      ? JSON.stringify(data, null, 2) // 格式化，缩进2个空格
      : JSON.stringify(data);

    // 生成文件名
    const timestamp = new Date().getTime();
    const defaultName = `data_${timestamp}.json`;
    const fileName = filename ? (filename.endsWith(".json") ? filename : `${filename}.json`) : defaultName;

    // 创建Blob对象
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8",
    });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // 设置链接属性
    link.href = url;
    link.download = fileName;
    link.style.display = "none";

    // 添加到文档并触发点击
    document.body.appendChild(link);
    link.click();

    // 清理资源
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    return {
      success: true,
      filename: fileName,
      size: jsonString.length,
    };
  } catch (error) {
    console.error("导出JSON文件失败:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * 高级JSON导出函数
 * @param {Object} data - 要导出的数据
 * @param {Object} options - 配置选项
 * @param {string} options.filename - 文件名
 * @param {boolean} options.formatted - 是否格式化
 * @param {Function} options.replacer - JSON.stringify的replacer函数
 * @param {string} options.space - 缩进字符串
 * @param {boolean} options.autoBom - 是否添加UTF-8 BOM
 * @param {Function} options.onSuccess - 成功回调
 * @param {Function} options.onError - 错误回调
 */
export function downloadJson<T = any>(data: T, options: DownloadOptions = {}): Promise<ExportResult> {
  const {
    filename = `data_${new Date().getTime()}.json`,
    formatted = true,
    replacer = null,
    space = 2,
    autoBom = true,
    onSuccess = null,
    onError = null,
  } = options;

  return new Promise((resolve, reject) => {
    try {
      // 验证数据
      if (data === null || data === undefined) {
        throw new Error("导出的数据不能为空");
      }

      if (typeof data !== "object") {
        throw new Error("导出的数据必须是对象或数组");
      }

      // 转换为JSON字符串
      const jsonString = formatted ? JSON.stringify(data, replacer, space) : JSON.stringify(data, replacer);

      // 处理BOM
      const content = autoBom ? "\uFEFF" + jsonString : jsonString;

      // 创建Blob
      const blob = new Blob([content], {
        type: "application/json;charset=utf-8",
      });

      // 使用不同方法处理不同浏览器
      if (navigator.msSaveBlob) {
        // IE10+ 的特殊处理
        navigator.msSaveBlob(blob, filename);
      } else {
        // 现代浏览器
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        // 处理Safari的兼容性
        if (typeof link.download === "undefined") {
          window.location.href = url;
        } else {
          link.href = url;
          link.download = filename;
          link.style.cssText = `
            position: fixed;
            top: -1000px;
            left: -1000px;
            opacity: 0;
            pointer-events: none;
          `;

          document.body.appendChild(link);
          link.click();

          // 延迟清理资源
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 100);
        }
      }

      // 触发回调
      const result = {
        success: true,
        filename,
        size: content.length,
        timestamp: new Date().toISOString(),
      };

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(result);
      }

      resolve(result);
    } catch (error) {
      const errorResult = {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      console.error("JSON导出失败:", error);

      if (onError && typeof onError === "function") {
        onError(errorResult);
      }

      reject(errorResult);
    }
  });
}

// 示例1：基础用法
// const basicResult = exportJsonToFile(sampleData, "用户数据.json");
// console.log("导出结果:", basicResult);

// 示例2：高级用法
// const advancedResult = downloadJson(sampleData, {
//   filename: "backup.json",
//   formatted: true,
//   space: 4, // 缩进4个空格
//   replacer: (key, value) => {
//     // 自定义转换逻辑
//     if (key === "email") {
//       return value.replace("@example.com", "@company.com");
//     }
//     return value;
//   },
//   onSuccess: (result) => {
//     console.log("导出成功:", result);
//   },
//   onError: (error) => {
//     console.error("导出失败:", error);
//   },
// });

// 示例4：导出数组数据
// const arrayData = [
//   { name: '产品A', price: 100, stock: 50 },
//   { name: '产品B', price: 200, stock: 30 },
//   { name: '产品C', price: 150, stock: 100 }
// ];

// 不格式化，节省空间
// exportJsonToFile(arrayData, 'products.json', false);

// 示例5：导出大文件（分片处理）
async function exportLargeJson(largeData, filename, chunkSize = 1024 * 1024) {
  // 1MB chunks
  const jsonString = JSON.stringify(largeData);
  const chunks = [];

  for (let i = 0; i < jsonString.length; i += chunkSize) {
    chunks.push(jsonString.slice(i, i + chunkSize));
  }

  // 如果是特别大的数据，可以分片处理
  if (chunks.length > 1) {
    console.warn("数据较大，考虑分片下载");
  }

  return exportJsonToFile(largeData, filename);
}
