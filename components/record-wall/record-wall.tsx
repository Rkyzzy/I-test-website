"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import "./record-wall.css";

interface Album {
  id: number;
  title: string;
  artist: string;
  year?: string;
  genre?: string;
  colors: [string, string];
}

const ALBUMS: Album[] = [
  { id: 1,  title: "叶惠美",           artist: "周杰伦",       year: "2003", genre: "流行",   colors: ["#8B4513", "#FFD700"] },
  { id: 2,  title: "危险世界",         artist: "方大同",       year: "2014", genre: "R&B",    colors: ["#1a1a2e", "#e94560"] },
  { id: 3,  title: "冀西南林路行",     artist: "万能青年旅店", year: "2020", genre: "摇滚",   colors: ["#2d4059", "#ea5455"] },
  { id: 4,  title: "寓言",             artist: "王菲",         year: "2000", genre: "流行",   colors: ["#6c5b7b", "#f8b500"] },
  { id: 5,  title: "新长征路上的摇滚", artist: "崔健",         year: "1989", genre: "摇滚",   colors: ["#2b2d42", "#8d99ae"] },
  { id: 6,  title: "黑梦",             artist: "窦唯",         year: "1994", genre: "摇滚",   colors: ["#0a0a0a", "#4a4a4a"] },
  { id: 7,  title: "种树",             artist: "林生祥",       year: "2006", genre: "民谣",   colors: ["#3e7b27", "#d4a373"] },
  { id: 8,  title: "Abbey Road",       artist: "The Beatles",  year: "1969", genre: "Rock",   colors: ["#3d5a80", "#e63946"] },
  { id: 9,  title: "Thriller",         artist: "Michael Jackson", year: "1982", genre: "Pop", colors: ["#e63946", "#f1faee"] },
  { id: 10, title: "The Dark Side of the Moon", artist: "Pink Floyd", year: "1973", genre: "Prog Rock", colors: ["#1d3557", "#e9c46a"] },
  { id: 11, title: "OK Computer",      artist: "Radiohead",    year: "1997", genre: "Alt Rock", colors: ["#8ecae6", "#023047"] },
  { id: 12, title: "Random Access Memories", artist: "Daft Punk", year: "2013", genre: "Electronic", colors: ["#6c5ce7", "#fd79a8"] },
  { id: 13, title: "Rumours",          artist: "Fleetwood Mac", year: "1977", genre: "Rock", colors: ["#724e91", "#f4a261"] },
  { id: 14, title: "Currents",         artist: "Tame Impala",  year: "2015", genre: "Psychedelic", colors: ["#0e7490", "#818cf8"] },
  { id: 15, title: "Nevermind",        artist: "Nirvana",      year: "1991", genre: "Grunge", colors: ["#0e6655", "#a3e4d7"] },
];

const ITEM_WIDTH = 200;
const ITEM_GAP   = -20;
const ITEM_STEP  = ITEM_WIDTH + ITEM_GAP;

function getItemStyle(index: number, scrollLeft: number, viewportWidth: number, padLeft: number) {
  const itemCenter = padLeft + index * ITEM_STEP + ITEM_WIDTH / 2;
  const viewCenter = scrollLeft + viewportWidth / 2;
  const distance   = (itemCenter - viewCenter) / (ITEM_WIDTH * 1.8);
  const clamped    = Math.max(-1.8, Math.min(1.8, distance));
  const absDist    = Math.abs(clamped);

  if (absDist > 1.5) {
    return {
      opacity: 0,
      pointerEvents: "none" as const,
      zIndex: 0,
      transform: "none",
      visibility: "hidden" as const,
    };
  }

  const t      = Math.min(absDist, 1);
  const smooth = t * t * (3 - 2 * t);

  const scale      = 1.12 - 0.62 * smooth;
  const rotateY    = -clamped * 62;
  const translateZ = (1 - smooth) * 160;
  const opacity    = 1 - 0.55 * smooth;
  const blur       = smooth * 1.2;

  return {
    transform: `perspective(900px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex: Math.round(1000 - absDist * 600),
    opacity,
    filter: `blur(${blur}px)`,
    position: "relative" as const,
    visibility: "visible" as const,
  };
}

export default function RecordWall() {
  const containerRef      = useRef<HTMLDivElement>(null);
  const [scrollLeft,      setScrollLeft]      = useState(0);
  const [viewportWidth,   setViewportWidth]   = useState(800);
  const initialScrollDone = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => setScrollLeft(container.scrollLeft);

    const handleResize = () => {
      const w = container.clientWidth;
      setViewportWidth(w);
      if (!initialScrollDone.current && w > 0) {
        initialScrollDone.current = true;
        const targetIndex = Math.min(5, ALBUMS.length - 1);
        container.scrollLeft = targetIndex * ITEM_STEP;
      }
    };

    handleScroll();
    handleResize();

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const padLeft = viewportWidth / 2 - ITEM_WIDTH / 2;

  const getStyle = useCallback(
    (index: number) => getItemStyle(index, scrollLeft, viewportWidth, padLeft),
    [scrollLeft, viewportWidth, padLeft],
  );

  return (
    <div className="record-wall-container">
      <div className="record-wall-fade fade-left" />
      <div className="record-wall-fade fade-right" />

      <div className="record-wall-scroll" ref={containerRef}>
        <div
          className="record-wall-track"
          style={{
            paddingLeft: padLeft,
            paddingRight: padLeft + 200,
          }}
        >
          {ALBUMS.map((album, index) => (
            <div
              key={album.id}
              className="record-item"
              style={{ ...getStyle(index), width: ITEM_WIDTH }}
            >
              <div
                className="record-cover"
                style={{
                  "--color-1": album.colors[0],
                  "--color-2": album.colors[1],
                } as React.CSSProperties}
              />
              <div className="record-info">
                <span className="record-title">{album.title}</span>
                <span className="record-artist">{album.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
