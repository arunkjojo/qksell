export function setMetaTag(property: string, content: string, isOg: boolean = true) {
    const attrName = isOg ? "property" : "name";
    let element = document.querySelector(`meta[${attrName}="${property}"]`) as HTMLMetaElement;

    if (element) {
        element.setAttribute("content", content);
    } else {
        element = document.createElement("meta");
        element.setAttribute(attrName, property);
        element.setAttribute("content", content);
        document.head.appendChild(element);
    }
  }