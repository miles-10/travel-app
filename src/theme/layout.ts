import { ViewStyle } from "react-native";

export default {
  col: {
    flexDirection: "column",
  },
  colReverse: {
    flexDirection: "column-reverse",
  },
  wrap: {
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  itemsCenter: {
    alignItems: "center",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  itemsStretch: {
    alignItems: "stretch",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyAround: {
    justifyContent: "space-around",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  /* Sizes Layouts */
  flex_01: {
    flex: 0.1,
  },
  flex_015: {
    flex: 0.15,
  },
  flex_016: {
    flex: 0.16,
  },
  flex_017: {
    flex: 0.17,
  },
  flex_018: {
    flex: 0.18,
  },
  flex_019: {
    flex: 0.19,
  },
  flex_02: {
    flex: 0.2,
  },
  flex_03: {
    flex: 0.3,
  },
  flex_04: {
    flex: 0.4,
  },
  flex_05: {
    flex: 0.5,
  },
  flex_06: {
    flex: 0.6,
  },
  flex_07: {
    flex: 0.7,
  },
  flex_074: {
    flex: 0.74,
  },
  flex_08: {
    flex: 0.8,
  },
  flex_09: {
    flex: 0.9,
  },
  flex_1: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  /* Positions */
  relative: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
  },
  top0: {
    top: 0,
  },
  bottom0: {
    bottom: 0,
  },
  left0: {
    left: 0,
  },
  right0: {
    right: 0,
  },
  z1: {
    zIndex: 1,
  },
  z10: {
    zIndex: 10,
  },
  z999: {
    zIndex: 999,
  },
  height250: {
    height: 250,
  },
  height220: {
    height: 220,
  },
  height200: {
    height: 200,
  },
  left10: {
    left: 10,
  },
  left15: {
    left: 15,
  },
  left22: {
    left: 22,
  },
  top8: {
    top: 8,
  },
  topNeg5: {
    top: -5,
  },
  topNeg8: {
    top: -8,
  },
  topNeg9: {
    top: -9,
  },
  topNeg10: {
    top: -10,
  },
} as const satisfies Record<string, ViewStyle>;
