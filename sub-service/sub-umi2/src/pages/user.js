import { useRootExports } from 'umi';

export default function() {
  const rootExports = useRootExports();
  console.log('rootExports', rootExports);
  return (
    <div>
      <h1>1111111111111111111</h1>
    </div>
  );
}
