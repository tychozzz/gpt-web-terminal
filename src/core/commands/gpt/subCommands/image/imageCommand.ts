import { defineAsyncComponent } from "vue";
import { CommandType } from "../../../../command";
import ComponentOutputType = GptTerminal.ComponentOutputType;

const sizeMap: Map<string, string> = new Map([
  ["256", "256x256"],
  ["512", "512x512"],
  ["1024", "1024x1024"],
]);

const imageCommand: CommandType = {
  func: "image",
  name: "智能生成图片",
  params: [
    {
      key: "prompt",
      desc: "生成图片的提示文本",
      required: true,
    },
  ],
  options: [
    {
      key: "number",
      desc: "生成图片的数量",
      alias: ["n"],
      type: "string",
      required: false,
    },
    {
      key: "size",
      desc: "生成图片的尺寸，可选 256/512/1024",
      alias: ["s"],
      type: "string",
      required: false,
    },
  ],
  async action(options, terminal) {
    const { _, number, size } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("图片生成提示内容不可为空");
      return;
    }
    if (number) {
      if (isNaN(number) || Number(number) < 1 || Number(number) > 5) {
        terminal.writeTextErrorResult("图片数量必须为1～5之间的整数");
        return;
      }
    }
    if (size && !sizeMap.has(size)) {
      terminal.writeTextErrorResult("图片尺寸格式不正确");
      return;
    }
    const prompt = _.join(" ");
    // const res: any = await getImage(prompt, number, size);
    // if (res?.code !== 0) {
    //   terminal.writeTextErrorResult(res.message);
    //   return;
    // }
    const imageBox: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./ImageBox.vue")),
      props: {
        prompt: prompt,
        number: Number(number),
        size: sizeMap.get(size),
      },
    };
    terminal.writeResult(imageBox);
  },
};

export default imageCommand;
