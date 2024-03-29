import product from "../../assets/images/Image.png";

function ComputerAccessories() {
  return (
    <div className="my-10 text-xs md:text-base mx-auto">
      <div className="flex justify-between my-10">
        <h2 className="font-bold text-lg text-[#191C1F]">Computer Accessories</h2>
        <ul className="flex gap-4">
          <li className="font-semibold cursor-pointer">All Product</li>
          <li className="text-[#5F6C72]  cursor-pointer">Keyboard and mouse</li>
          <li className="text-[#5F6C72]  cursor-pointer">Headphone</li>
          <li className="text-[#5F6C72]  cursor-pointer">Webcam</li>
          <li className="text-[#5F6C72] cursor-pointer ">Printer</li>
          <li className="text-[#FA8232] font-semibold cursor-pointer">Browser All Product</li>
        </ul>
      </div>
      <div>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex w-48 flex-col  p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
          <div className="flex w-48 flex-col p-2 border ">
            <img className="w-52 " src={product} alt="" />
            <p className="text-sm">Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...</p>
            <p>$2,300</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComputerAccessories;
