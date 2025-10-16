export function czmlDocumentWriter(name: string, startISOstring: string, endISOstring: string, multiplier: number) {
  return {
    id: "document",
    name: name,
    version: "1.0",
    description: "Describes a CZML document.",
    title: "Document",
    clock: {
      // interval为有效时间，currentTime表示起始点，multiplier表示时钟速度
      interval: startISOstring + "/" + endISOstring,
      currentTime: startISOstring, // 当前时间
      multiplier: multiplier, // 乘数
      range: "LOOP_STOP",
      step: "SYSTEM_CLOCK_MULTIPLIER",
    },
  };
}

// example
// {
//   "id":"document",
//   "name":"simple",
//   "version":"1.0",
//   "clock":{
//     "interval":"2012-03-15T10:00:00Z/2012-03-16T10:00:00Z",
//     "currentTime":"2012-03-15T10:00:00Z",
//     "multiplier":60,
//     "range":"LOOP_STOP",
//     "step":"SYSTEM_CLOCK_MULTIPLIER"
//   }
// }
