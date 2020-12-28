export function getBatteryIcon(battery, charging = false, state) {
  const isFull = battery === 100;
  const isDepleted = !battery || battery === 0;
  const level = battery < 10 ? 10 : Math.floor(battery / 10) * 10;
  const isCharging = state !== "offline" && charging;

  if (isDepleted) {
    return isCharging ? "battery-charging-outline" : "battery-outline";
  }

  if (isFull) {
    return isCharging ? "battery-charging-100" : "battery";
  }

  return isCharging ? `battery-charging-${level}` : `battery-${level}`;
}
