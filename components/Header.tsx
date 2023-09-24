interface HeaderProps {
  score: number
  bestScore: number,
}

const Header: React.FC<HeaderProps> = ({ score, bestScore, }) => {
  return (
    <div>
      <div className="flex justify-between lg:justify-evenly text-lg font-semibold md:text-4xl md:p-20 text-center px-6 pt-6">
        <h1 className="">Score: {score}</h1>
        <h1 className="">Best: {bestScore}</h1>
      </div>
    </div>
  )
}

export default Header
