import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />

        <script dangerouslySetInnerHTML={{__html: `
(function() {
  var HASH = "01161ae2b117efa872e39042f87af1ed0712180de7b8f23d5b732864e6338141";
  if (sessionStorage.getItem("mmx-auth") === HASH) return;
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("quartz-root").style.display = "none";
    var overlay = document.createElement("div");
    overlay.id = "pw-gate";
    overlay.innerHTML = '<div style="max-width:380px;margin:0 auto;text-align:center">'
      + '<h1 style="font-size:1.6rem;margin-bottom:0.25rem;color:#e0e0e0">MetamusicX Wiki</h1>'
      + '<p style="color:#999;margin-bottom:2rem;font-size:0.95rem">Enter the team password to continue</p>'
      + '<input id="pw-input" type="password" placeholder="Password" autofocus '
      + 'style="width:100%;padding:12px 16px;font-size:1rem;border:1px solid #444;border-radius:8px;background:#1e1e20;color:#e0e0e0;outline:none;box-sizing:border-box" />'
      + '<button id="pw-btn" style="width:100%;padding:12px;margin-top:12px;font-size:1rem;border:none;border-radius:8px;background:#284b63;color:#fff;cursor:pointer">Enter</button>'
      + '<p id="pw-err" style="color:#e55;margin-top:1rem;display:none;font-size:0.9rem">Incorrect password</p>'
      + '</div>';
    overlay.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#161618;font-family:system-ui,sans-serif";
    document.body.appendChild(overlay);
    function tryAuth() {
      var pw = document.getElementById("pw-input").value;
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw)).then(function(buf) {
        var hash = Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,"0")}).join("");
        if (hash === HASH) {
          sessionStorage.setItem("mmx-auth", HASH);
          overlay.remove();
          document.getElementById("quartz-root").style.display = "";
        } else {
          document.getElementById("pw-err").style.display = "block";
          document.getElementById("pw-input").value = "";
          document.getElementById("pw-input").focus();
        }
      });
    }
    document.getElementById("pw-btn").addEventListener("click", tryAuth);
    document.getElementById("pw-input").addEventListener("keydown", function(e) {
      if (e.key === "Enter") tryAuth();
    });
  });
})();
        `}} />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
