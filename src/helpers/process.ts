import rough from 'roughjs/bin/rough';
import { RoughSVG } from 'roughjs/bin/svg';
import { Options } from 'roughjs/bin/core';

const getString = (element: SVGElement, attribute: string) : string | undefined => {
  return element.getAttribute(attribute) || undefined;
}

const getNumber = (element: SVGElement, attribute: string) : number | undefined => {
  if (element.getAttribute(attribute)) {
    return Number(element.getAttribute(attribute));
  }

  return undefined;
}

const options = (element: SVGElement, customOptions: Partial<Options>): Options => {
  console.log(element.getAttribute('stroke-width'))
  return {
    fill: getString(element,'fill'),
    stroke: getString(element, 'stroke'),
    strokeWidth: getNumber(element, 'stroke-width'),
    ...customOptions,
  };
}

const processPath = (rc: RoughSVG, path: SVGPathElement, customOptions: Partial<Options>) => {
  const node = rc.path(path.getAttribute("d") || "", options(path, customOptions));
  path.parentNode?.replaceChild(node, path);
}

const processRect = (rc: RoughSVG, rect: SVGRectElement, customOptions: Partial<Options>) => {
  let node = rc.rectangle(
    Number(rect.getAttribute("x")),
    Number(rect.getAttribute("y")),
    Number(rect.getAttribute("width")),
    Number(rect.getAttribute("height")),
    options(rect, customOptions),
  );
  rect.parentNode?.replaceChild(node, rect);
}

const processCircle = (rc: RoughSVG, circle: SVGCircleElement, customOptions: Partial<Options>) => {
  let node = rc.circle(
    Number(circle.getAttribute("cx")),
    Number(circle.getAttribute("cy")),
    Number(circle.getAttribute("r"))*2,
    options(circle, customOptions),
  );
  console.log(Number(circle.getAttribute("r")), Number(circle.getAttribute("r"))*2)
  circle.parentNode?.replaceChild(node, circle);
}

const processEllipse = (rc: RoughSVG, ellipse: SVGEllipseElement, customOptions: Partial<Options>) => {
  let node = rc.ellipse(
    Number(ellipse.getAttribute("cx")),
    Number(ellipse.getAttribute("cy")),
    Number(ellipse.getAttribute("rx"))*2,
    Number(ellipse.getAttribute("ry"))*2,
    options(ellipse, customOptions),
  );
  ellipse.parentNode?.replaceChild(node, ellipse);
}

const processLine = (rc: RoughSVG, line: SVGLineElement, customOptions: Partial<Options>) => {
  let node = rc.rectangle(
    Number(line.getAttribute("x1")),
    Number(line.getAttribute("y1")),
    Number(line.getAttribute("x2")),
    Number(line.getAttribute("y2")),
    options(line, customOptions),
  );
  line.parentNode?.replaceChild(node, line);
}

const serialize = (element: SVGElement): string => {
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(element);

  // eslint-disable-next-line no-useless-escape
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // eslint-disable-next-line no-useless-escape
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  return '<?xml version="1.0" standalone="no"?>\r\n' + source;
}

export const processSvg = (content: string, customOptions: Partial<Options> = {}): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const div = document.createElement('div');
      div.innerHTML = content;
      const svg = div.querySelector('svg');
      if (!svg) {
        throw new Error('Svg element not found')
      }

      let rc = rough.svg(svg);
      div.querySelectorAll("path").forEach(x => processPath(rc, x, customOptions));
      div.querySelectorAll("rect").forEach(x => processRect(rc, x, customOptions));
      div.querySelectorAll("circle").forEach(x => processCircle(rc, x, customOptions));
      div.querySelectorAll("ellipse").forEach(x => processEllipse(rc, x, customOptions));
      div.querySelectorAll("line").forEach(x => processLine(rc, x, customOptions));
      resolve(serialize(svg));
    } catch (err) {
      reject(err)
    }
  });
