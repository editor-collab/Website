"use client";

import { useState } from "react";
import CURSORS_DATA from "@/data/cursors.json";

const LIGHT_COLORS = new Set(CURSORS_DATA.lightColors);
const CURSORS = CURSORS_DATA.cursors;

function CursorArrow({ color }: { color: string }) {
  return (
    <svg
      width="38"
      height="57"
      viewBox="0 0 251 374"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "block" }}
    >
      <path
        d="M52.2933 22.252C35.4945 7.13311 15 17.5484 15 36.363V276.25C15 292.376 36.5024 301.784 46.9177 293.384C53.4815 288.091 65.459 276.25 72.7034 271.137C79.9478 266.025 92.0228 260.918 99.4994 274.97C106.976 289.022 126.589 335.494 130.576 345.461C135.279 357.22 151.07 360.915 160.813 356.884C170.557 352.852 191.387 343.109 197.099 338.741C202.81 334.373 205.834 321.27 200.459 311.527C196.493 304.339 174.681 255.808 168.932 243.672C163.184 231.537 168.293 223.872 181.068 221.956C193.842 220.04 194.747 220.478 216.249 216.11C237.752 211.742 240.104 191.92 226.665 179.825C213.226 167.729 69.0921 37.371 52.2933 22.252Z"
        fill={color}
      />
    </svg>
  );
}

export default function CollabCursors() {
  const [names, setNames] = useState<Record<number, string>>(
    () => Object.fromEntries(CURSORS.map((c) => [c.id, c.name]))
  );

  return (
    <div className="cartoon-bg" aria-hidden="true">
      {CURSORS.map((cursor) => (
        <div
          key={cursor.id}
          style={{
            position: "absolute",
            top: cursor.top,
            left: cursor.left,
            pointerEvents: "none",
            animation: `${cursor.anim} 0.55s ${cursor.delay} cubic-bezier(0.22, 0.61, 0.36, 1) both`,
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "flex-start", gap: "5px" }}>
            <CursorArrow color={cursor.color} />
            <span
              role="textbox"
              contentEditable
              suppressContentEditableWarning
              aria-label="Cursor name"
              onInput={(e) =>
                setNames((prev) => ({
                  ...prev,
                  [cursor.id]: (e.target as HTMLElement).textContent ?? "",
                }))
              }
              style={{
                display: "inline-block",
                marginTop: "3px",
                padding: "4px 13px 5px",
                borderRadius: "10px",
                background: cursor.color,
                color: LIGHT_COLORS.has(cursor.color) ? "#111122" : "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                outline: "none",
                cursor: "text",
                minWidth: "24px",
                userSelect: "text",
                pointerEvents: "auto",
                boxShadow: `0 2px 10px ${cursor.color}55`,
              }}
            >
              {cursor.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
