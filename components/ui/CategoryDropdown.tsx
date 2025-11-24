import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import React, { useRef, useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";

type Props = {
  value: string;
  onChange: (category: string) => void;
  options?: Record<string, string>;
};

const DEFAULT_OPTIONS: Record<string, string> = {
  now_playing: "Now Playing",
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

export default function CategoryDropdown({ value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);
  const opts = options ?? DEFAULT_OPTIONS;
  const buttonRef = useRef<any>(null);
  const [menuPos, setMenuPos] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [menuWidth, setMenuWidth] = useState<number | null>(null);
  const menuBg = useThemeColor({}, "background");
  const overlayBg = useThemeColor(
    { light: "rgba(0,0,0,0.08)", dark: "rgba(0,0,0,0.6)" },
    "background"
  );

  return (
    <>
      <View style={styles.wrap} pointerEvents="box-none">
        <Pressable
          ref={buttonRef}
          onPress={() => {
            // open then measure to position menu
            setOpen((s) => {
              const next = !s;
              if (!next) {
                setMenuPos(null);
              }
              return next;
            });
            // measure after next frame
            requestAnimationFrame(() => {
              try {
                buttonRef.current?.measureInWindow(
                  (x: number, y: number, width: number, height: number) => {
                    setMenuPos({ x, y, width, height });
                  }
                );
              } catch {
                // ignore on platforms where measureInWindow isn't available
              }
            });
          }}
          style={styles.button}
        >
          <ThemedText>{opts[value]}</ThemedText>
          <ThemedText> ▾</ThemedText>
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={[styles.modalOverlay, { backgroundColor: overlayBg }]}
          onPress={() => setOpen(false)}
        />

        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <View
            onLayout={(e) => setMenuWidth(e.nativeEvent.layout.width)}
            style={[
              styles.menu,
              { backgroundColor: menuBg },
              (() => {
                const windowW = Dimensions.get("window").width;
                const margin = 8;
                if (menuPos && menuWidth) {
                  let left = menuPos.x;
                  // if overflowing, shift left so it fits within window with margin
                  if (left + menuWidth + margin > windowW) {
                    left = Math.max(margin, windowW - menuWidth - margin);
                  }
                  return { top: menuPos.y + menuPos.height, left };
                }
                return { top: 40, right: 0 } as any;
              })(),
            ]}
          >
            {Object.entries(opts).map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => {
                  setOpen(false);
                  onChange(key);
                }}
                style={styles.menuItem}
              >
                <ThemedText>{label}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "relative",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  menu: {
    position: "absolute",
    top: 40,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 6,
    zIndex: 2,
    alignSelf: "flex-start",
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalMenuWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
