import Button from '@/components/atoms/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button disabled>
        <span>Button</span>
      </Button>
      <Button variant="secondary">
        <span>Button</span>
      </Button>
      <Button variant="tertiary">
        <span>Button</span>
      </Button>
      <Button variant="ghost">
        <span>Button</span>
      </Button>
      <Button size="fit">
        paaaa
      </Button>
    </div>
  );
}
