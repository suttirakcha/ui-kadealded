import CustomInput from '@/components/custom/CustomInput';



function CoinTransacTion() {

  return (
    <div className="flex-1 flex flex-col ml-30 justify-center items-center text-center md:text-left md:items-start">
      <h2 className="text-2xl mb-4">CointransacTion</h2>

      <div className="p-4 w-full">
        <table className="w-full border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2"> Process</th>
              <th className="border border-gray-400 p-2"> Coin</th>
              <th className="border border-gray-400 p-2"> Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-gray-400 p-2'>fdg</td>
              <td className='border border-gray-400 p-2'>fdvx</td>
              <td className='border border-gray-400 p-2'>mgjm</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div >
  )
}

export default CoinTransacTion
