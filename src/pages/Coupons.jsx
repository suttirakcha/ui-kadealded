import React from 'react'

function CoinTransacTion() {

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center md:text-left md:items-start">
      <h2 className="text-2xl mb-4">Coupon</h2>

      <div className="p-4 w-full">
        <table className="w-full border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2"> ID </th>
              <th className="border border-gray-400 p-2"> In</th>
              <th className="border border-gray-400 p-2"> Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-300 border-t-0 border-l-0 border-r-0 p-2">1</td>
              <td className="border-b border-gray-300 border-t-0 border-l-0 border-r-0 p-2">200</td>
              <td className="border-b border-gray-300 border-t-0 border-l-0 border-r-0 p-2">200</td>
            </tr>

          </tbody>
        </table>
    </div>

    </div >
  )
}



export default Coupons