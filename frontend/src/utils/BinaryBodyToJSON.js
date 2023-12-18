export const binaryBodyToJSON = async (obj) => {
    let binaryData = new Uint8Array(obj.binaryBody);
    let jsonStr = new TextDecoder("utf-8").decode(binaryData);
    return await JSON.parse(jsonStr);
}