import { Button } from "@benjamin/ui";

export default function Home() {
  return (
    <div className="flex item-center justify-center flex-col">
      <div className="text-center text-3xl mb-10">Benjamin Web App</div>
      <Button>Open alert</Button>
    </div>
  );
}
