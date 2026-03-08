'use client'
/* prettier-ignore-start */
/* eslint-disable */

/******************************************************************************
 * This file was generated
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/


import { jsx } from "react/jsx-runtime";
import { useRef, useCallback, useSyncExternalStore, useState, useEffect } from "react";
import { LikeC4Model } from "@likec4/core/model";
import { LikeC4ModelProvider as LikeC4ModelProvider$1, LikeC4View as LikeC4View$1, ReactLikeC4 as ReactLikeC4$1 } from "likec4/react";
const Icons = {};
function IconRenderer({ node, ...props }) {
  const IconComponent = Icons[node.icon ?? ""];
  if (!IconComponent) {
    return null;
  }
  return jsx(IconComponent, props);
}
let r = /* @__PURE__ */ Symbol(`clean`), i = [], a = 0, o = 0;
const s = (e2) => {
  let t2 = [], n = { get() {
    return n.lc || n.listen(() => {
    })(), n.value;
  }, lc: 0, listen(e3) {
    return n.lc = t2.push(e3), () => {
      for (let t3 = a + 4; t3 < i.length; ) i[t3] === e3 ? i.splice(t3, 4) : t3 += 4;
      let r2 = t2.indexOf(e3);
      ~r2 && (t2.splice(r2, 1), --n.lc || n.off());
    };
  }, notify(e3, r2) {
    o++;
    let s2 = !i.length;
    for (let a2 of t2) i.push(a2, n.value, e3, r2);
    if (s2) {
      for (a = 0; a < i.length; a += 4) i[a](i[a + 1], i[a + 2], i[a + 3]);
      i.length = 0;
    }
  }, off() {
  }, set(e3) {
    let t3 = n.value;
    t3 !== e3 && (n.value = e3, n.notify(t3));
  }, subscribe(e3) {
    let t3 = n.listen(e3);
    return e3(n.value), t3;
  }, value: e2 };
  return process.env.NODE_ENV !== `production` && (n[r] = () => {
    t2 = [], n.lc = 0, n.off();
  }), n;
};
let c = (e2, t2, n, r2) => (e2.events = e2.events || {}, e2.events[n + 10] || (e2.events[n + 10] = r2((t3) => {
  e2.events[n].reduceRight((e3, t4) => (t4(e3), e3), { shared: {}, ...t3 });
})), e2.events[n] = e2.events[n] || [], e2.events[n].push(t2), () => {
  let r3 = e2.events[n], i2 = r3.indexOf(t2);
  r3.splice(i2, 1), r3.length || (delete e2.events[n], e2.events[n + 10](), delete e2.events[n + 10]);
}), l = (e2, t2) => {
  let n = (n2) => {
    let r2 = t2(n2);
    r2 && e2.events[6].push(r2);
  };
  return c(e2, n, 5, (t3) => {
    let n2 = e2.listen;
    e2.listen = (...r2) => (!e2.lc && !e2.active && (e2.active = true, t3()), n2(...r2));
    let i2 = e2.off;
    if (e2.events[6] = [], e2.off = () => {
      i2(), setTimeout(() => {
        if (e2.active && !e2.lc) {
          e2.active = false;
          for (let t4 of e2.events[6]) t4();
          e2.events[6] = [];
        }
      }, 1e3);
    }, process.env.NODE_ENV !== `production`) {
      let t4 = e2[r];
      e2[r] = () => {
        for (let t5 of e2.events[6]) t5();
        e2.events[6] = [], e2.active = false, t4();
      };
    }
    return () => {
      e2.listen = n2, e2.off = i2;
    };
  });
}, u = (e2, t2, n) => {
  Array.isArray(e2) || (e2 = [e2]);
  let r2, i2, a2 = () => {
    if (i2 === o) return;
    i2 = o;
    let n2 = e2.map((e3) => e3.get());
    if (!r2 || n2.some((e3, t3) => e3 !== r2[t3])) {
      r2 = n2;
      let e3 = t2(...n2);
      e3 && e3.then && e3.t ? e3.then((e4) => {
        r2 === n2 && c2.set(e4);
      }) : (c2.set(e3), i2 = o);
    }
  }, c2 = s(void 0), u2 = c2.get;
  c2.get = () => (a2(), u2());
  let f2 = a2;
  return l(c2, () => {
    let t3 = e2.map((e3) => e3.listen(f2));
    return a2(), () => {
      for (let e3 of t3) e3();
    };
  }), c2;
};
const d = (e2, t2) => u(e2, t2);
function p(e2, t2, n) {
  let r2 = new Set(t2).add(void 0);
  return e2.listen((e3, t3, i2) => {
    r2.has(i2) && n(e3, t3, i2);
  });
}
let h = (e2, t2) => (n) => {
  e2.current !== n && (e2.current = n, t2());
};
function g(r2, { keys: i2, deps: a2 = [r2, i2] } = {}) {
  let o2 = useRef();
  o2.current = r2.get();
  let s2 = useCallback((e2) => (h(o2, e2)(r2.value), i2?.length > 0 ? p(r2, i2, h(o2, e2)) : r2.listen(h(o2, e2))), a2), c2 = () => o2.current;
  return useSyncExternalStore(s2, c2, c2);
}
Math.random.bind(Math);
function e(e2, t2, n) {
  let r2 = (n2) => e2(n2, ...t2);
  return n === void 0 ? r2 : Object.assign(r2, { lazy: n, lazyArgs: t2 });
}
function t(t2, n, r2) {
  let i2 = t2.length - n.length;
  if (i2 === 0) return t2(...n);
  if (i2 === 1) return e(t2, n, r2);
  throw Error(`Wrong number of arguments`);
}
function ae(...e2) {
  return t(Z, e2);
}
function Z(e2, t2) {
  if (e2 === t2 || Object.is(e2, t2)) return true;
  if (typeof e2 != `object` || typeof t2 != `object` || e2 === null || t2 === null || Object.getPrototypeOf(e2) !== Object.getPrototypeOf(t2)) return false;
  if (Array.isArray(e2)) return oe(e2, t2);
  if (e2 instanceof Map) return se(e2, t2);
  if (e2 instanceof Set) return ce(e2, t2);
  if (e2 instanceof Date) return e2.getTime() === t2.getTime();
  if (e2 instanceof RegExp) return e2.toString() === t2.toString();
  if (Object.keys(e2).length !== Object.keys(t2).length) return false;
  for (let [n, r2] of Object.entries(e2)) if (!(n in t2) || !Z(r2, t2[n])) return false;
  return true;
}
function oe(e2, t2) {
  if (e2.length !== t2.length) return false;
  for (let [n, r2] of e2.entries()) if (!Z(r2, t2[n])) return false;
  return true;
}
function se(e2, t2) {
  if (e2.size !== t2.size) return false;
  for (let [n, r2] of e2.entries()) if (!t2.has(n) || !Z(r2, t2.get(n))) return false;
  return true;
}
function ce(e2, t2) {
  if (e2.size !== t2.size) return false;
  let n = [...t2];
  for (let t3 of e2) {
    let e3 = false;
    for (let [r2, i2] of n.entries()) if (Z(t3, i2)) {
      e3 = true, n.splice(r2, 1);
      break;
    }
    if (!e3) return false;
  }
  return true;
}
function Me(...e2) {
  return t(Ne, e2);
}
function Ne(e2, t2) {
  let n = {};
  for (let [r2, i2] of Object.entries(e2)) n[r2] = t2(i2, r2, e2);
  return n;
}
/* @__PURE__ */ new Set([`-`, `_`, ...`	.
.\v.\f.\r. .. . . . . . . . . . . . . .\u2028.\u2029. . .　.\uFEFF`.split(`.`)]);
const f = (e2) => {
  let n = d(e2, (e3) => LikeC4Model.create(e3));
  function r2(t2) {
    let n2 = e2.get();
    if (ae(n2, t2)) return;
    let r3 = { ...t2, views: Me(t2.views, (e3) => {
      let t3 = n2.views[e3.id];
      return ae(t3, e3) ? t3 : e3;
    }) };
    e2.set(r3);
  }
  let a2 = d(e2, (e3) => Object.values(e3.views));
  function d$1() {
    return g(n);
  }
  function f2() {
    return g(a2);
  }
  function p2(t2) {
    let [n2, r3] = useState(e2.value?.views[t2] ?? null);
    return useEffect(() => e2.subscribe((e3) => {
      r3(e3.views[t2] ?? null);
    }), [t2]), n2;
  }
  return { updateModel: r2, $likec4model: n, useLikeC4Model: d$1, useLikeC4Views: f2, useLikeC4View: p2 };
};
const $likec4data = s({ _stage: "layouted", projectId: "default", project: { id: "default", title: "default" }, specification: { tags: {}, elements: { person: { style: { shape: "person", color: "amber" } }, softwareSystem: { style: { shape: "rectangle", color: "blue" } }, externalSystem: { style: { shape: "rectangle", color: "slate" } }, container: { style: { shape: "rectangle", color: "green" } }, component: { style: { shape: "rectangle", color: "sky" } }, database: { style: { shape: "storage", color: "red" } }, queue: { style: { shape: "queue", color: "purple" } } }, relationships: { sync: { style: { line: "solid", color: "blue" } } }, deployments: {}, customColors: {} }, elements: { architect: { style: { shape: "person", color: "amber" }, description: { txt: "Uses DSS for architecture decisions" }, title: "Architect", kind: "person", id: "architect" }, developer: { style: { shape: "person", color: "amber" }, description: { txt: "Queries knowledge base" }, title: "Developer", kind: "person", id: "developer" }, ba: { style: { shape: "person", color: "amber" }, description: { txt: "Uses DSS for requirements support" }, title: "Business Analyst", kind: "person", id: "ba" }, pm: { style: { shape: "person", color: "amber" }, description: { txt: "Uses DSS for project management" }, title: "Project Manager", kind: "person", id: "pm" }, dss: { style: { shape: "rectangle", color: "blue" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, title: "DSS", kind: "softwareSystem", id: "dss" }, discord: { style: { shape: "rectangle", color: "slate" }, description: { txt: "Source of team discussions" }, title: "Discord", kind: "externalSystem", id: "discord" }, confluence: { style: { shape: "rectangle", color: "slate" }, description: { txt: "Documentation source" }, title: "Confluence", kind: "externalSystem", id: "confluence" }, jira: { style: { shape: "rectangle", color: "slate" }, description: { txt: "Project management source" }, title: "Jira", kind: "externalSystem", id: "jira" }, bitbucket: { style: { shape: "rectangle", color: "slate" }, description: { txt: "Source code repository" }, title: "Bitbucket", kind: "externalSystem", id: "bitbucket" }, llmProvider: { style: { shape: "rectangle", color: "slate" }, description: { txt: "Claude API (Anthropic)" }, title: "LLM Provider", kind: "externalSystem", id: "llmProvider" }, vectorDb: { style: { shape: "storage", color: "red" }, description: { txt: "Vector storage for embeddings, agent state, metadata" }, title: "PostgreSQL + pgvector", kind: "database", id: "vectorDb" }, "dss.apiGateway": { style: { shape: "rectangle", color: "green" }, technology: "NestJS, TypeScript", description: { txt: "NestJS HTTP server — auth, routing, request orchestration" }, title: "API Gateway", kind: "container", id: "dss.apiGateway" }, "dss.agentOrchestrator": { style: { shape: "rectangle", color: "green" }, technology: "Mastra, TypeScript", description: { txt: "Mastra runtime — agent registry, intent routing, tool management" }, title: "Agent Orchestrator", kind: "container", id: "dss.agentOrchestrator" }, "dss.ragEngine": { style: { shape: "rectangle", color: "green" }, technology: "Mastra RAG, pgvector", description: { txt: "Embedding generation, vector search, context assembly" }, title: "RAG Engine", kind: "container", id: "dss.ragEngine" }, "dss.ingestionPipeline": { style: { shape: "rectangle", color: "green" }, technology: "NestJS, Mastra Syncs", description: { txt: "Scheduled crawling & indexing from knowledge sources" }, title: "Ingestion Pipeline", kind: "container", id: "dss.ingestionPipeline" }, "dss.discordBot": { style: { shape: "rectangle", color: "green" }, technology: "Discord.js", description: { txt: "Channel adapter — Discord interaction" }, title: "Discord Bot", kind: "container", id: "dss.discordBot" }, "dss.mcpServer": { style: { shape: "rectangle", color: "green" }, technology: "MCP SDK, SSE/stdio", description: { txt: "Channel adapter — MCP protocol for Claude Code and other MCP clients" }, title: "MCP Server", kind: "container", id: "dss.mcpServer" } }, relations: { "4zof1z": { title: "Queries architecture knowledge", source: { model: "architect" }, target: { model: "dss" }, id: "4zof1z" } }, globals: { predicates: {}, dynamicPredicates: {}, styles: {} }, views: { index: { _stage: "layouted", _type: "element", id: "index", title: "Landscape view", description: null, autoLayout: { direction: "TB" }, hash: "XLtT9SuFD_ZSUfN4DQ-e5Zjr4ri3uaiICj1owsQgI6g", bounds: { x: 0, y: 0, width: 1626, height: 1105 }, nodes: [{ id: "architect", parent: null, level: 0, children: [], inEdges: [], outEdges: ["22t6jd"], title: "Architect", modelRef: "architect", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for architecture decisions" }, tags: [], kind: "person", navigateTo: "__architect", x: 2, y: 0, width: 320, height: 180, labelBBox: { x: 38, y: 63, width: 244, height: 48 } }, { id: "developer", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Developer", modelRef: "developer", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Queries knowledge base" }, tags: [], kind: "person", navigateTo: "__developer", x: 434, y: 0, width: 320, height: 180, labelBBox: { x: 76, y: 63, width: 169, height: 48 } }, { id: "ba", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Business Analyst", modelRef: "ba", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for requirements support" }, tags: [], kind: "person", navigateTo: "__ba", x: 434, y: 323, width: 320, height: 180, labelBBox: { x: 40, y: 63, width: 241, height: 47 } }, { id: "pm", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Project Manager", modelRef: "pm", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for project management" }, tags: [], kind: "person", navigateTo: "__pm", x: 434, y: 624, width: 320, height: 180, labelBBox: { x: 42, y: 63, width: 236, height: 47 } }, { id: "dss", parent: null, level: 0, children: [], inEdges: ["22t6jd"], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", navigateTo: "systemContext", x: 0, y: 323, width: 324, height: 180, labelBBox: { x: 18, y: 54, width: 288, height: 65 } }, { id: "discord", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Discord", modelRef: "discord", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source of team discussions" }, tags: [], kind: "externalSystem", navigateTo: "__discord", x: 434, y: 925, width: 320, height: 180, labelBBox: { x: 66, y: 63, width: 187, height: 47 } }, { id: "confluence", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Confluence", modelRef: "confluence", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Documentation source" }, tags: [], kind: "externalSystem", navigateTo: "__confluence", x: 864, y: 0, width: 320, height: 180, labelBBox: { x: 83, y: 63, width: 154, height: 48 } }, { id: "jira", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Jira", modelRef: "jira", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Project management source" }, tags: [], kind: "externalSystem", navigateTo: "__jira", x: 864, y: 323, width: 320, height: 180, labelBBox: { x: 64, y: 63, width: 192, height: 47 } }, { id: "bitbucket", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Bitbucket", modelRef: "bitbucket", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source code repository" }, tags: [], kind: "externalSystem", navigateTo: "__bitbucket", x: 864, y: 624, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 158, height: 47 } }, { id: "llmProvider", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "LLM Provider", modelRef: "llmProvider", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Claude API (Anthropic)" }, tags: [], kind: "externalSystem", navigateTo: "__llmProvider", x: 864, y: 925, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 157, height: 47 } }, { id: "vectorDb", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "PostgreSQL + pgvector", modelRef: "vectorDb", shape: "storage", color: "red", style: { opacity: 15, size: "md" }, description: { txt: "Vector storage for embeddings, agent state, metadata" }, tags: [], kind: "database", navigateTo: "__vectorDb", x: 1294, y: 0, width: 331, height: 180, labelBBox: { x: 18, y: 54, width: 296, height: 66 } }], edges: [{ id: "22t6jd", source: "architect", target: "dss", label: "Queries architecture knowledge", points: [[162, 180], [162, 221], [162, 270], [162, 313]], labelBBox: { x: 163, y: 240, width: 201, height: 18 }, parent: null, relations: ["4zof1z"], color: "gray", line: "dashed", head: "normal" }] }, systemContext: { _type: "element", tags: null, links: null, viewOf: "dss", _stage: "layouted", sourcePath: "src/views.c4", description: null, title: "DSS — System Context", id: "systemContext", autoLayout: { direction: "TB" }, hash: "QsDbuyU1fyRKieOOQ_EhSQCbV3dfarngvPn85MIVlqA", bounds: { x: 0, y: 0, width: 2580, height: 1080 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.apiGateway", "dss.agentOrchestrator", "dss.ragEngine", "dss.ingestionPipeline", "dss.discordBot", "dss.mcpServer"], inEdges: ["22t6jd"], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "containers", x: 8, y: 239, width: 1310, height: 581, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.apiGateway", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "API Gateway", modelRef: "dss.apiGateway", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "NestJS HTTP server — auth, routing, request orchestration" }, tags: [], technology: "NestJS, TypeScript", kind: "container", navigateTo: "__dss_apiGateway", x: 50, y: 300, width: 340, height: 180, labelBBox: { x: 18, y: 44, width: 304, height: 85 } }, { id: "dss.agentOrchestrator", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Agent Orchestrator", modelRef: "dss.agentOrchestrator", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Mastra runtime — agent registry, intent routing, tool management" }, tags: [], technology: "Mastra, TypeScript", kind: "container", navigateTo: "__dss_agentOrchestrator", x: 500, y: 300, width: 320, height: 180, labelBBox: { x: 30, y: 44, width: 261, height: 85 } }, { id: "dss.ragEngine", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "RAG Engine", modelRef: "dss.ragEngine", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Embedding generation, vector search, context assembly" }, tags: [], technology: "Mastra RAG, pgvector", kind: "container", navigateTo: "__dss_ragEngine", x: 930, y: 300, width: 346, height: 180, labelBBox: { x: 18, y: 44, width: 310, height: 85 } }, { id: "dss.ingestionPipeline", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Ingestion Pipeline", modelRef: "dss.ingestionPipeline", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Scheduled crawling & indexing from knowledge sources" }, tags: [], technology: "NestJS, Mastra Syncs", kind: "container", navigateTo: "__dss_ingestionPipeline", x: 48, y: 600, width: 354, height: 180, labelBBox: { x: 18, y: 44, width: 318, height: 85 } }, { id: "dss.discordBot", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Discord Bot", modelRef: "dss.discordBot", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — Discord interaction" }, tags: [], technology: "Discord.js", kind: "container", navigateTo: "__dss_discordBot", x: 512, y: 600, width: 320, height: 180, labelBBox: { x: 30, y: 53, width: 260, height: 67 } }, { id: "dss.mcpServer", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "MCP Server", modelRef: "dss.mcpServer", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — MCP protocol for Claude Code and other MCP clients" }, tags: [], technology: "MCP SDK, SSE/stdio", kind: "container", navigateTo: "__dss_mcpServer", x: 942, y: 600, width: 336, height: 180, labelBBox: { x: 18, y: 44, width: 300, height: 85 } }, { id: "architect", parent: null, level: 0, children: [], inEdges: [], outEdges: ["22t6jd"], title: "Architect", modelRef: "architect", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for architecture decisions" }, tags: [], kind: "person", navigateTo: "__architect", x: 60, y: 0, width: 320, height: 180, labelBBox: { x: 38, y: 63, width: 244, height: 48 } }, { id: "developer", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Developer", modelRef: "developer", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Queries knowledge base" }, tags: [], kind: "person", navigateTo: "__developer", x: 1388, y: 0, width: 320, height: 180, labelBBox: { x: 75, y: 63, width: 169, height: 48 } }, { id: "ba", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Business Analyst", modelRef: "ba", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for requirements support" }, tags: [], kind: "person", navigateTo: "__ba", x: 1388, y: 300, width: 320, height: 180, labelBBox: { x: 40, y: 63, width: 241, height: 48 } }, { id: "pm", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Project Manager", modelRef: "pm", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for project management" }, tags: [], kind: "person", navigateTo: "__pm", x: 1388, y: 600, width: 320, height: 180, labelBBox: { x: 42, y: 63, width: 236, height: 48 } }, { id: "discord", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Discord", modelRef: "discord", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source of team discussions" }, tags: [], kind: "externalSystem", navigateTo: "__discord", x: 1388, y: 900, width: 320, height: 180, labelBBox: { x: 66, y: 63, width: 187, height: 48 } }, { id: "confluence", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Confluence", modelRef: "confluence", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Documentation source" }, tags: [], kind: "externalSystem", navigateTo: "__confluence", x: 1818, y: 0, width: 320, height: 180, labelBBox: { x: 83, y: 63, width: 154, height: 48 } }, { id: "jira", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Jira", modelRef: "jira", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Project management source" }, tags: [], kind: "externalSystem", navigateTo: "__jira", x: 1818, y: 300, width: 320, height: 180, labelBBox: { x: 64, y: 63, width: 192, height: 48 } }, { id: "bitbucket", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Bitbucket", modelRef: "bitbucket", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source code repository" }, tags: [], kind: "externalSystem", navigateTo: "__bitbucket", x: 1818, y: 600, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 158, height: 48 } }, { id: "llmProvider", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "LLM Provider", modelRef: "llmProvider", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Claude API (Anthropic)" }, tags: [], kind: "externalSystem", navigateTo: "__llmProvider", x: 1818, y: 900, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 157, height: 48 } }, { id: "vectorDb", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "PostgreSQL + pgvector", modelRef: "vectorDb", shape: "storage", color: "red", style: { opacity: 15, size: "md" }, description: { txt: "Vector storage for embeddings, agent state, metadata" }, tags: [], kind: "database", navigateTo: "__vectorDb", x: 2248, y: 0, width: 331, height: 180, labelBBox: { x: 18, y: 54, width: 296, height: 66 } }], edges: [{ id: "22t6jd", source: "architect", target: "dss", label: "Queries architecture knowledge", points: [[220, 180], [220, 195], [220, 212], [220, 228]], labelBBox: { x: 18, y: 186, width: 201, height: 18 }, parent: null, relations: ["4zof1z"], color: "gray", line: "dashed", head: "normal" }] }, containers: { _type: "element", tags: null, links: null, viewOf: "dss", _stage: "layouted", sourcePath: "src/views.c4", description: null, title: "DSS — Container Diagram", id: "containers", autoLayout: { direction: "TB" }, hash: "STYfRWbu0ss-x-Lpne2AXF1DtyV_dsFhurmRGetiosA", bounds: { x: 0, y: 0, width: 2150, height: 1080 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.apiGateway", "dss.agentOrchestrator", "dss.ragEngine", "dss.ingestionPipeline", "dss.discordBot", "dss.mcpServer"], inEdges: ["22t6jd"], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 239, width: 1310, height: 581, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.apiGateway", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "API Gateway", modelRef: "dss.apiGateway", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "NestJS HTTP server — auth, routing, request orchestration" }, tags: [], technology: "NestJS, TypeScript", kind: "container", navigateTo: "__dss_apiGateway", x: 50, y: 300, width: 340, height: 180, labelBBox: { x: 18, y: 44, width: 304, height: 85 } }, { id: "dss.agentOrchestrator", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Agent Orchestrator", modelRef: "dss.agentOrchestrator", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Mastra runtime — agent registry, intent routing, tool management" }, tags: [], technology: "Mastra, TypeScript", kind: "container", navigateTo: "__dss_agentOrchestrator", x: 500, y: 300, width: 320, height: 180, labelBBox: { x: 30, y: 44, width: 261, height: 85 } }, { id: "dss.ragEngine", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "RAG Engine", modelRef: "dss.ragEngine", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Embedding generation, vector search, context assembly" }, tags: [], technology: "Mastra RAG, pgvector", kind: "container", navigateTo: "__dss_ragEngine", x: 930, y: 300, width: 346, height: 180, labelBBox: { x: 18, y: 44, width: 310, height: 85 } }, { id: "dss.ingestionPipeline", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Ingestion Pipeline", modelRef: "dss.ingestionPipeline", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Scheduled crawling & indexing from knowledge sources" }, tags: [], technology: "NestJS, Mastra Syncs", kind: "container", navigateTo: "__dss_ingestionPipeline", x: 48, y: 600, width: 354, height: 180, labelBBox: { x: 18, y: 44, width: 318, height: 85 } }, { id: "dss.discordBot", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Discord Bot", modelRef: "dss.discordBot", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — Discord interaction" }, tags: [], technology: "Discord.js", kind: "container", navigateTo: "__dss_discordBot", x: 512, y: 600, width: 320, height: 180, labelBBox: { x: 30, y: 53, width: 260, height: 67 } }, { id: "dss.mcpServer", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "MCP Server", modelRef: "dss.mcpServer", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — MCP protocol for Claude Code and other MCP clients" }, tags: [], technology: "MCP SDK, SSE/stdio", kind: "container", navigateTo: "__dss_mcpServer", x: 942, y: 600, width: 336, height: 180, labelBBox: { x: 18, y: 44, width: 300, height: 85 } }, { id: "architect", parent: null, level: 0, children: [], inEdges: [], outEdges: ["22t6jd"], title: "Architect", modelRef: "architect", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for architecture decisions" }, tags: [], kind: "person", navigateTo: "__architect", x: 60, y: 0, width: 320, height: 180, labelBBox: { x: 38, y: 63, width: 244, height: 48 } }, { id: "developer", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Developer", modelRef: "developer", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Queries knowledge base" }, tags: [], kind: "person", navigateTo: "__developer", x: 1388, y: 0, width: 320, height: 180, labelBBox: { x: 75, y: 63, width: 169, height: 48 } }, { id: "discord", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Discord", modelRef: "discord", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source of team discussions" }, tags: [], kind: "externalSystem", navigateTo: "__discord", x: 1388, y: 300, width: 320, height: 180, labelBBox: { x: 66, y: 63, width: 187, height: 48 } }, { id: "confluence", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Confluence", modelRef: "confluence", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Documentation source" }, tags: [], kind: "externalSystem", navigateTo: "__confluence", x: 1388, y: 600, width: 320, height: 180, labelBBox: { x: 83, y: 63, width: 154, height: 48 } }, { id: "jira", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Jira", modelRef: "jira", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Project management source" }, tags: [], kind: "externalSystem", navigateTo: "__jira", x: 1388, y: 900, width: 320, height: 180, labelBBox: { x: 64, y: 63, width: 192, height: 48 } }, { id: "bitbucket", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Bitbucket", modelRef: "bitbucket", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source code repository" }, tags: [], kind: "externalSystem", navigateTo: "__bitbucket", x: 1824, y: 0, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 158, height: 48 } }, { id: "llmProvider", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "LLM Provider", modelRef: "llmProvider", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Claude API (Anthropic)" }, tags: [], kind: "externalSystem", navigateTo: "__llmProvider", x: 1824, y: 300, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 157, height: 48 } }, { id: "vectorDb", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "PostgreSQL + pgvector", modelRef: "vectorDb", shape: "storage", color: "red", style: { opacity: 15, size: "md" }, description: { txt: "Vector storage for embeddings, agent state, metadata" }, tags: [], kind: "database", navigateTo: "__vectorDb", x: 1818, y: 600, width: 331, height: 180, labelBBox: { x: 18, y: 54, width: 296, height: 66 } }], edges: [{ id: "22t6jd", source: "architect", target: "dss", label: "Queries architecture knowledge", points: [[220, 180], [220, 195], [220, 212], [220, 228]], labelBBox: { x: 18, y: 186, width: 201, height: 18 }, parent: null, relations: ["4zof1z"], color: "gray", line: "dashed", head: "normal" }] }, __architect: { _stage: "layouted", _type: "element", id: "__architect", viewOf: "architect", title: "Auto / Architect", description: null, autoLayout: { direction: "TB" }, hash: "fB2OXT90J2p-5v_UZAUS_7vsE1JvH6Lae_t8Rgi6bjU", bounds: { x: 0, y: 0, width: 365, height: 503 }, nodes: [{ id: "architect", parent: null, level: 0, children: [], inEdges: [], outEdges: ["22t6jd"], title: "Architect", modelRef: "architect", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for architecture decisions" }, tags: [], kind: "person", x: 2, y: 0, width: 320, height: 180, labelBBox: { x: 38, y: 63, width: 244, height: 48 } }, { id: "dss", parent: null, level: 0, children: [], inEdges: ["22t6jd"], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", navigateTo: "systemContext", x: 0, y: 323, width: 324, height: 180, labelBBox: { x: 18, y: 54, width: 288, height: 65 } }], edges: [{ id: "22t6jd", source: "architect", target: "dss", label: "Queries architecture knowledge", points: [[162, 180], [162, 221], [162, 270], [162, 313]], labelBBox: { x: 163, y: 240, width: 201, height: 18 }, parent: null, relations: ["4zof1z"], color: "gray", line: "dashed", head: "normal" }] }, __developer: { _stage: "layouted", _type: "element", id: "__developer", viewOf: "developer", title: "Auto / Developer", description: null, autoLayout: { direction: "TB" }, hash: "Q367xA2CiB2xcBim2N1eznDlN77nVS1e-oa2iXts0Co", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "developer", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Developer", modelRef: "developer", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Queries knowledge base" }, tags: [], kind: "person", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 75, y: 63, width: 169, height: 48 } }], edges: [] }, __ba: { _stage: "layouted", _type: "element", id: "__ba", viewOf: "ba", title: "Auto / Business Analyst", description: null, autoLayout: { direction: "TB" }, hash: "XqSiLMY68rFgLu-S9OsOLFwYrgTOiQQI4X9KuvvQBpw", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "ba", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Business Analyst", modelRef: "ba", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for requirements support" }, tags: [], kind: "person", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 40, y: 63, width: 241, height: 48 } }], edges: [] }, __pm: { _stage: "layouted", _type: "element", id: "__pm", viewOf: "pm", title: "Auto / Project Manager", description: null, autoLayout: { direction: "TB" }, hash: "qCTavRpvtZNyhpi60T3-8UTyh9zUVdLNLY3cbowEwcQ", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "pm", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Project Manager", modelRef: "pm", shape: "person", color: "amber", style: { opacity: 15, size: "md" }, description: { txt: "Uses DSS for project management" }, tags: [], kind: "person", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 42, y: 63, width: 236, height: 48 } }], edges: [] }, __discord: { _stage: "layouted", _type: "element", id: "__discord", viewOf: "discord", title: "Auto / Discord", description: null, autoLayout: { direction: "TB" }, hash: "lcm-49JYXGff53kL2bKCjaq_d_Wf35OMMX_qBdBOYLU", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "discord", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Discord", modelRef: "discord", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source of team discussions" }, tags: [], kind: "externalSystem", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 66, y: 63, width: 187, height: 48 } }], edges: [] }, __confluence: { _stage: "layouted", _type: "element", id: "__confluence", viewOf: "confluence", title: "Auto / Confluence", description: null, autoLayout: { direction: "TB" }, hash: "qWnRP-EE2VdEqf32O5JVno5C8A50ewAjtQatD4i3tfs", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "confluence", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Confluence", modelRef: "confluence", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Documentation source" }, tags: [], kind: "externalSystem", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 83, y: 63, width: 154, height: 48 } }], edges: [] }, __jira: { _stage: "layouted", _type: "element", id: "__jira", viewOf: "jira", title: "Auto / Jira", description: null, autoLayout: { direction: "TB" }, hash: "YWMDQcZjZWleoaKzdmzFgJ8m6WhCbD6JkSOjSCheZOA", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "jira", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Jira", modelRef: "jira", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Project management source" }, tags: [], kind: "externalSystem", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 64, y: 63, width: 192, height: 48 } }], edges: [] }, __bitbucket: { _stage: "layouted", _type: "element", id: "__bitbucket", viewOf: "bitbucket", title: "Auto / Bitbucket", description: null, autoLayout: { direction: "TB" }, hash: "JoOwMSlBIxjXaerEYnXei1-Mu2-Z0n_fsXaox3BnG8o", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "bitbucket", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "Bitbucket", modelRef: "bitbucket", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Source code repository" }, tags: [], kind: "externalSystem", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 158, height: 48 } }], edges: [] }, __llmProvider: { _stage: "layouted", _type: "element", id: "__llmProvider", viewOf: "llmProvider", title: "Auto / LLM Provider", description: null, autoLayout: { direction: "TB" }, hash: "BTK1KR0iu6gc_XEimjWasNRV0Nc049B0pkHX8E7GR_w", bounds: { x: 0, y: 0, width: 320, height: 180 }, nodes: [{ id: "llmProvider", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "LLM Provider", modelRef: "llmProvider", shape: "rectangle", color: "slate", style: { opacity: 15, size: "md" }, description: { txt: "Claude API (Anthropic)" }, tags: [], kind: "externalSystem", x: 0, y: 0, width: 320, height: 180, labelBBox: { x: 81, y: 63, width: 157, height: 48 } }], edges: [] }, __vectorDb: { _stage: "layouted", _type: "element", id: "__vectorDb", viewOf: "vectorDb", title: "Auto / PostgreSQL + pgvector", description: null, autoLayout: { direction: "TB" }, hash: "y30x2vIV39KgBstkDWRp3eHGcOluVXuoeltwWmdA73g", bounds: { x: 0, y: 0, width: 332, height: 180 }, nodes: [{ id: "vectorDb", parent: null, level: 0, children: [], inEdges: [], outEdges: [], title: "PostgreSQL + pgvector", modelRef: "vectorDb", shape: "storage", color: "red", style: { opacity: 15, size: "md" }, description: { txt: "Vector storage for embeddings, agent state, metadata" }, tags: [], kind: "database", x: 0, y: 0, width: 331, height: 180, labelBBox: { x: 18, y: 54, width: 296, height: 66 } }], edges: [] }, __dss_apiGateway: { _stage: "layouted", _type: "element", id: "__dss_apiGateway", viewOf: "dss.apiGateway", title: "Auto / API Gateway", description: null, autoLayout: { direction: "TB" }, hash: "D27-qMvkA9FkCxJeur4ZPgJU1V21fg3KLsghTS68fW0", bounds: { x: 0, y: 0, width: 420, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.apiGateway"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 404, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.apiGateway", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "API Gateway", modelRef: "dss.apiGateway", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "NestJS HTTP server — auth, routing, request orchestration" }, tags: [], technology: "NestJS, TypeScript", kind: "container", x: 40, y: 61, width: 340, height: 180, labelBBox: { x: 18, y: 44, width: 304, height: 86 } }], edges: [] }, __dss_agentOrchestrator: { _stage: "layouted", _type: "element", id: "__dss_agentOrchestrator", viewOf: "dss.agentOrchestrator", title: "Auto / Agent Orchestrator", description: null, autoLayout: { direction: "TB" }, hash: "SW3abK1DbXmUYA-ADIJY1ttxmt0so_uLcXvM_5UmovA", bounds: { x: 0, y: 0, width: 400, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.agentOrchestrator"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 384, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.agentOrchestrator", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Agent Orchestrator", modelRef: "dss.agentOrchestrator", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Mastra runtime — agent registry, intent routing, tool management" }, tags: [], technology: "Mastra, TypeScript", kind: "container", x: 40, y: 61, width: 320, height: 180, labelBBox: { x: 30, y: 44, width: 261, height: 86 } }], edges: [] }, __dss_ragEngine: { _stage: "layouted", _type: "element", id: "__dss_ragEngine", viewOf: "dss.ragEngine", title: "Auto / RAG Engine", description: null, autoLayout: { direction: "TB" }, hash: "3DPtqlQr5J0YC9Rdh9eGMtyZQPIs9LmksdgGeCkr7tk", bounds: { x: 0, y: 0, width: 426, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.ragEngine"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 410, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.ragEngine", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "RAG Engine", modelRef: "dss.ragEngine", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Embedding generation, vector search, context assembly" }, tags: [], technology: "Mastra RAG, pgvector", kind: "container", x: 40, y: 61, width: 346, height: 180, labelBBox: { x: 18, y: 44, width: 310, height: 86 } }], edges: [] }, __dss_ingestionPipeline: { _stage: "layouted", _type: "element", id: "__dss_ingestionPipeline", viewOf: "dss.ingestionPipeline", title: "Auto / Ingestion Pipeline", description: null, autoLayout: { direction: "TB" }, hash: "JwOSO47Gx_9iLiWWRPwzHvNuvLxN1w5AMZRLSQFRhvg", bounds: { x: 0, y: 0, width: 434, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.ingestionPipeline"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 418, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.ingestionPipeline", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Ingestion Pipeline", modelRef: "dss.ingestionPipeline", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Scheduled crawling & indexing from knowledge sources" }, tags: [], technology: "NestJS, Mastra Syncs", kind: "container", x: 40, y: 61, width: 354, height: 180, labelBBox: { x: 18, y: 44, width: 318, height: 86 } }], edges: [] }, __dss_discordBot: { _stage: "layouted", _type: "element", id: "__dss_discordBot", viewOf: "dss.discordBot", title: "Auto / Discord Bot", description: null, autoLayout: { direction: "TB" }, hash: "vQNJAKr5a7YT-M17nURw_clOM_yd6YYmJfRKd5HkeoA", bounds: { x: 0, y: 0, width: 400, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.discordBot"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 384, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.discordBot", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "Discord Bot", modelRef: "dss.discordBot", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — Discord interaction" }, tags: [], technology: "Discord.js", kind: "container", x: 40, y: 61, width: 320, height: 180, labelBBox: { x: 30, y: 53, width: 260, height: 68 } }], edges: [] }, __dss_mcpServer: { _stage: "layouted", _type: "element", id: "__dss_mcpServer", viewOf: "dss.mcpServer", title: "Auto / MCP Server", description: null, autoLayout: { direction: "TB" }, hash: "r13sFoc8A1hRN8itkoUSsMUbb98_JJnJjXq7_g8P8cU", bounds: { x: 0, y: 0, width: 416, height: 281 }, nodes: [{ id: "dss", parent: null, level: 0, children: ["dss.mcpServer"], inEdges: [], outEdges: [], title: "DSS", modelRef: "dss", shape: "rectangle", color: "blue", style: { opacity: 15, size: "md" }, description: { txt: "Decision Support System — RAG-powered architecture knowledge API" }, tags: [], kind: "softwareSystem", depth: 1, navigateTo: "systemContext", x: 8, y: 8, width: 400, height: 265, labelBBox: { x: 6, y: 0, width: 27, height: 15 } }, { id: "dss.mcpServer", parent: "dss", level: 1, children: [], inEdges: [], outEdges: [], title: "MCP Server", modelRef: "dss.mcpServer", shape: "rectangle", color: "green", style: { opacity: 15, size: "md" }, description: { txt: "Channel adapter — MCP protocol for Claude Code and other MCP clients" }, tags: [], technology: "MCP SDK, SSE/stdio", kind: "container", x: 40, y: 61, width: 336, height: 180, labelBBox: { x: 18, y: 44, width: 300, height: 86 } }], edges: [] } }, deployments: { elements: {}, relations: {} }, imports: {}, manualLayouts: {} });
const {
  $likec4model,
  useLikeC4Model,
  useLikeC4View
} = f($likec4data);
function LikeC4ModelProvider({ children }) {
  const likeC4Model = useLikeC4Model();
  return jsx(LikeC4ModelProvider$1, { likec4model: likeC4Model, children });
}
function LikeC4View(props) {
  return jsx(LikeC4ModelProvider, { children: jsx(LikeC4View$1, { renderIcon: IconRenderer, ...props }) });
}
function ReactLikeC4(props) {
  return jsx(LikeC4ModelProvider, { children: jsx(ReactLikeC4$1, { renderIcon: IconRenderer, ...props }) });
}
const likec4model = $likec4model.get();
function isLikeC4ViewId(value) {
  const model = $likec4data.get();
  return value != null && typeof value === "string" && !!model.views[value];
}
export {
  LikeC4ModelProvider,
  LikeC4View,
  ReactLikeC4,
  IconRenderer as RenderIcon,
  isLikeC4ViewId,
  likec4model,
  useLikeC4Model,
  useLikeC4View
};


/* prettier-ignore-end */

