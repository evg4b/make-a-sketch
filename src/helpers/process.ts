import rough from 'roughjs/bin/rough';
import { RoughSVG } from 'roughjs/bin/svg';

const processPath = (rc: RoughSVG, pathElement: SVGPathElement) => {
  const node = rc.path(pathElement.getAttribute("d") || "", {
    fill: pathElement.getAttribute("fill") || undefined,
    stroke: pathElement.getAttribute("stroke") || undefined,
  });

  pathElement.parentNode?.replaceChild(node, pathElement);
}

const processRect = (rc: RoughSVG, rect: SVGRectElement) => {
  let node = rc.rectangle(
    Number(rect.getAttribute("x")),
    Number(rect.getAttribute("y")),
    Number(rect.getAttribute("width")),
    Number(rect.getAttribute("height"))
  );
  rect.parentNode?.replaceChild(node, rect);
}

const processCircle = (rc: RoughSVG, rect: SVGCircleElement) => {
  let node = rc.circle(
    Number(rect.getAttribute("cx")),
    Number(rect.getAttribute("cy")),
    Number(rect.getAttribute("r"))
  );
  rect.parentNode?.replaceChild(node, rect);
}

const processEllipse = (rc: RoughSVG, rect: SVGEllipseElement) => {
  let node = rc.ellipse(
    Number(rect.getAttribute("cx")),
    Number(rect.getAttribute("cy")),
    Number(rect.getAttribute("rx")),
    Number(rect.getAttribute("ry"))
  );
  rect.parentNode?.replaceChild(node, rect);
}

const processLine = (rc: RoughSVG, rect: SVGLineElement) => {
  let node = rc.rectangle(
    Number(rect.getAttribute("x1")),
    Number(rect.getAttribute("y1")),
    Number(rect.getAttribute("x2")),
    Number(rect.getAttribute("y2"))
  );
  rect.parentNode?.replaceChild(node, rect);
}

const serialize = (element: SVGElement) : string => {
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(element);

  if(!source.match(/^<svg[^>]+xmlns="http\\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  if(!source.match(/^<svg[^>]+"http\\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  return '<?xml version="1.0" standalone="no"?>\r\n' + source;
}

export const processSvg = (content: string): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const div = document.createElement('div');
      div.innerHTML = content;
      const svg = div.querySelector('svg');
      if (!svg) {
        throw new Error('Svg element not found')
      }

      let rc = rough.svg(svg);
      div.querySelectorAll("path").forEach(x => processPath(rc, x));
      div.querySelectorAll("rect").forEach(x => processRect(rc, x));
      div.querySelectorAll("circle").forEach(x => processCircle(rc, x));
      div.querySelectorAll("ellipse").forEach(x => processEllipse(rc, x));
      div.querySelectorAll("line").forEach(x => processLine(rc, x));
      resolve(serialize(svg));
    } catch (err) {
      reject(err)
    }
  });
