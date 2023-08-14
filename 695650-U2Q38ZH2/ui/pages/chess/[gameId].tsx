import { useRouter } from 'next/router';
import GamePage from '@/components/chess/GamePage';
function GameDynamic() {
  const router = useRouter();
  return <GamePage />;
}

export default GameDynamic;
