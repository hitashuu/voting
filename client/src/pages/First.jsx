import image from '../assets/freepik__upload__2615.png'

export default function First() {
  return (
    <div className="relative w-full h-screen">
     
    <img
  src={image}
  alt="Background"
  className="absolute w-150 h-150 object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
/>

{/* <h5 className="absolute left-[20px] top-1/2 text-[70px] font-semibold text-orange-500">
  Janhit me jarih
</h5> */}

    </div> 
  );
}
