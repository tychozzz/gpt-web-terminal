declare namespace Gpt {
  interface MessageElement {
    role: string;
    content: string;
  }
  
  interface MessageType {
    roleKeyword: string | "default";
    roleName: string;
    roleDesc: string;
    systemMessage: string;
    parentMessageId: string;
    messageElements: MessageElement[];
  }
}