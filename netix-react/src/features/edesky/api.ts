import type { EDeskyResponse, Dashboard, Meta } from "./types";

export async function searchEDesky(query: string): Promise<EDeskyResponse> {
  const url = `https://api.edesky.cz/search?dotazy=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const xmlText = await res.text();

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "text/xml");

  const apiRoot = xml.getElementsByTagName("edesky_search_api")[0];

  // meta
  const metaNode = apiRoot.getElementsByTagName("meta")[0];

  const meta: Meta = {
    timestamp: metaNode.getElementsByTagName("timestamp")[0].textContent!,
    user: metaNode.getElementsByTagName("user")[0].textContent!,
    requested_params: metaNode.getElementsByTagName("requested_params")[0].textContent!,
    dashboards_count: Number(
      metaNode.getElementsByTagName("dashboards_count")[0].textContent!
    )
  };

  // dashboards
  const dashboardsNodes = Array.from(xml.getElementsByTagName("dashboard"));

  const dashboards: Dashboard[] = dashboardsNodes.map(node => ({
    name: node.getAttribute("name") || undefined,
    category: node.getAttribute("category") || undefined,
    edesky_id: Number(node.getAttribute("edesky_id")),
    edesky_url: node.getAttribute("edesky_url") || undefined,
    nuts3_name: node.getAttribute("nuts3_name") || undefined,
    nuts4_name: node.getAttribute("nuts4_name") || undefined,
    ruian_kod: Number(node.getAttribute("ruian_kod"))
  }));

  return {
    version: Number(apiRoot.getAttribute("version")),
    meta,
    dashboards
  };
}
