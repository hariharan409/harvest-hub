import { TiltCard } from "./TiltCard";

const Dashboard = () => {

    return (
        <div className="relative p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                {/* Card 1 */}
                <TiltCard cardNo={1}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        active crops
                    </h1>
                    <h1 className={`xs:text-[50px] sm:text-[30px] lg:text-[40px] xl:text-[50px] text-[#915EFF] capitalize font-bold text-center animate-pulse text-nowrap`}>
                        2
                    </h1>
                </TiltCard>
                {/* Card 2 */}
                <TiltCard cardNo={2}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        active crops list
                    </h1>
                    <div className="w-full flex justify-evenly">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-[#915EFF]" />
                            <div className='w-1 h-full violet-gradient' />
                        </div>
                        <ul className="list-disc marker:text-white pl-5 overflow-y-auto my-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-[#915EFF] text-[20px] capitalize font-bold animate-pulse">
                            <li>peanut</li>
                            <li>chilli</li>
                        </ul>
                    </div>
                </TiltCard>
                {/* Card 3 */}
                <TiltCard cardNo={3}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        active crops exp
                    </h1>
                    <h1 className={`xs:text-[50px] sm:text-[30px] lg:text-[40px] xl:text-[50px] text-[#915EFF] capitalize font-bold text-center animate-pulse text-nowrap`}>
                        150000 <span className="text-white">₹</span>
                    </h1>
                </TiltCard>
                {/* Card 4 */}
                <TiltCard cardNo={4}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        amount settled
                    </h1>
                    <h1 className={`xs:text-[50px] sm:text-[30px] lg:text-[40px] xl:text-[50px] text-[#915EFF] capitalize font-bold text-center animate-pulse text-nowrap`}>
                        100000 <span className="text-white">₹</span>
                    </h1>
                </TiltCard>
                {/* Card 5 */}
                <TiltCard cardNo={5}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        pending to settle
                    </h1>
                    <h1 className={`xs:text-[50px] sm:text-[30px] lg:text-[40px] xl:text-[50px] text-[#915EFF] capitalize font-bold text-center animate-pulse text-nowrap`}>
                        50000 <span className="text-white">₹</span>
                    </h1>
                </TiltCard>
                {/* Card 6 */}
                <TiltCard cardNo={6}>
                    <h1 className={`text-2xl capitalize font-bold text-center`}>
                        pending work task
                    </h1>
                    <h1 className={`xs:text-[50px] sm:text-[30px] lg:text-[40px] xl:text-[50px] text-[#915EFF] capitalize font-bold text-center animate-pulse text-nowrap`}>
                        4
                    </h1>
                </TiltCard>
            </div>
        </div>
      );
}

export default Dashboard;