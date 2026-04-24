import { DaBiTechLogo } from "./dabi-tech-logo";

type DaBiTechLogoDarkProps = {
  className?: string;
};

export function DaBiTechLogoDark({ className }: DaBiTechLogoDarkProps) {
  return <DaBiTechLogo className={className} variant="dark" />;
}
