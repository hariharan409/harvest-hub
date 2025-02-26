import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

export const TiltCard = ({children,cardNo}) => {

    return(
        <Tilt className='w-full'>
            <motion.div variants={fadeIn("right", "spring", cardNo * 0.5, 0.75)} initial="hidden" animate="show" className="green-pink-gradient p-[1px] rounded-[20px] shadow-card">
                <div options={{max: 45,scale: 1,speed: 450}} className='bg-tertiary rounded-[20px] py-5 px-12 h-[280px] flex flex-col justify-evenly items-center'>
                    {children}
                </div>
            </motion.div>
        </Tilt>
    )
}