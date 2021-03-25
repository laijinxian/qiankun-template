import { useRootExports } from 'umi';

export default function() {
  const rootExports = useRootExports();
  return (
    <div>
      <h1>sub-umi3 Dashboard</h1>
    </div>
  );
}
