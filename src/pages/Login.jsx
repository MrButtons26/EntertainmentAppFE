export default function Login(){
    return(<>
    <div className="flex flex-row h-[100vh] justify-center items-center">   
    <div className="flex dd w-[70vw] h-[45vw] bg-white  rounded-3xl">
    <div className="w-[50%] one">
     <h1 className="mt-16 text-3xl font-thin">Sign In</h1>
     <form className="flex flex-col pt-10 w-[75%]" onSubmit={(e)=>{e.preventDefault()}}>
        <input className="px-2.5 py-2 w-[100%] rounded-lg bg-[#eee] block mb-10" type="text" placeholder="Enter your Email"/>
        <input className="px-2.5 py-2 w-[100%] rounded-lg bg-[#eee] block mb-10" type="text"placeholder="Enter your Password" />
        <button onClick={()=>{}} className=" w-fit self-center py-1.5 px-6 bg-[#512da8] text-white rounded-md">SIGN IN</button>
     </form></div>
    <div className="flex flex-col items-center w-[50%] two two-active">
        <h1 className="mt-16 font-semibold text-3xl">Hello , Friend !</h1>
        <h1 className="m-2 text-l mt-4 text-center">Register with your personal details with us to use all the sites features</h1>
        <button className="mt-3 border-2 px-6 py-1.5 rounded-md text-white">SIGN UP</button>
    </div>
    </div>
    </div>
    </>)
}