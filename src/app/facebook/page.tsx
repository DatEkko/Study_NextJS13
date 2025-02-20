'use client'
import { useRouter } from "next/navigation";

const Facebook = () => {
    const router = useRouter();

    const handleBTH = () => {
        router.push('/')
    }

    return (
        <>
            <div>
                <button onClick={() => handleBTH()}>Back to home</button>
            </div>
            <div>Facebook</div>
        </>

    )
}

export default Facebook;