import { Unmatched, usePathname } from "expo-router";

export default function Bruh() {
  const pathname = usePathname();
  console.warn(pathname);
  return <Unmatched />;
}
