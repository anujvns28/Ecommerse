import { useNavigate, useOutletContext } from "react-router-dom"


const ProfileInfo = () => {

    const [userData] = useOutletContext()
    console.log(userData,"datakjlj")
    const nevagite = useNavigate();

    return (
        <div className='w-full p-6 flex flex-col gap-3'>

            <div>
                <p className='text-2xl font-semibold pb-1'>Your Name</p>
                <div className='flex flex-row gap-3'>
                    <div className='w-[29%] rounded-md border border-black py-2 px-4'
                    >{userData.firstName}</div>
                    <div className='w-[29%] rounded-md border border-black py-2 px-4'
                    >{userData.lastName}</div>

                <button onClick={() => nevagite("/my-profile/update-profile") }
                    className='py-2 px-4 bg-yellow-400 rounded-md '>
                        Edit 
                </button>
                </div>
            </div>

            <div>
                <p className='text-2xl font-semibold pb-1'>Your Email</p>
                 <div className="flex flex-row gap-2">
                 <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                    {userData.email}
                </div>

                <button onClick={() => nevagite("/my-profile/update-profile") }
                    className='py-2 px-4 bg-yellow-400 rounded-md '>
                        Edit 
                </button>
                 </div>
            </div>

            <div>
                <p className='text-2xl font-semibold pb-1'>Mobile Nomber</p>
                <div className="flex flex-row gap-2">
                <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                    {!userData.additionalInfo.contactNumber ? "Phone Number" : userData.additionalInfo.contactNumber}
                </div>

                <button onClick={() => nevagite("/my-profile/update-profile") }
                    className='py-2 px-4 bg-yellow-400 rounded-md '>
                        Edit 
                </button>
                </div>
            </div>

            <div className='flex w-[60%] justify-between'>
                <div className='w-[49%]'>
                    <p className='text-2xl font-semibold pb-1'>Gender</p>
                    <div className='w-full rounded-md border border-black py-2 px-4'>
                        {!userData.additionalInfo.gender ? "Gender" : userData.additionalInfo.gender}
                    </div>
                </div>

                <div className='w-[49%]'>
                    <p className='text-2xl font-semibold pb-1 '>Date of Birth</p>
                    <div className='w-full rounded-md border  border-black py-2 px-4'>
                        {!userData.additionalInfo.dateOfBirth ? " Date of Birth" : userData.additionalInfo.dateOfBirth}
                    </div>
                </div>
            </div>

            <div className=''>
                <p className='text-2xl font-semibold pb-1'>About</p>
                <div className='w-[60%] rounded-md border border-black py-2 px-4'>
                    {!userData.additionalInfo.about ? "About" : userData.additionalInfo.about}
                </div>
            </div>


        </div>
    )
}

export default ProfileInfo
