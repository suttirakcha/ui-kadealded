import { CardDeal } from "@/components/ui/card";
import React from "react";

function About() {
  return (
    <div>
      {/* Company Image */}
      <div>
        <img src="/src/assets/logoLong.png" alt="company logo long" />
      </div>
      {/* Company Description */}
      <div>
        <h3 className="w-3/5 mx-auto text-center py-10">
          <span className="text-xl font-bold">“คดีลเด็ด”</span>{" "}
          เราคือทีมผู้เชี่ยวชาญด้านการตลาดและเทคโนโลยี
          ที่รวมตัวกันเพื่อสร้างแพลตฟอร์มโฆษณาออนไลน์ที่ตอบโจทย์ธุรกิจยุคดิจิทัล
          ไม่ว่าคุณจะเป็นเจ้าของกิจการขนาดเล็ก หรือองค์กรขนาดใหญ่
          เราช่วยให้คุณเข้าถึงกลุ่มเป้าหมายได้อย่างแม่นยำ สร้างการรับรู้
          เพิ่มยอดขาย และสร้างภาพลักษณ์แบรนด์ให้ยั่งยืน
        </h3>
      </div>
      {/* Our Team */}
      <div>
        <h3 className="text-center text-xl mb-5">OUR TEAM</h3>
        <div className="bg-gray-300 rounded-2xl h-120 mx-10 ">
          <div className="mx-auto max-w-[1200px] w-full h-full rounded-2xl px-20 py-10 flex gap-3">
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
             
                <img
                  src="/src/assets/members/alpha.jpg"
                  alt="Alpha"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Alpha</p>
              
            </CardDeal>
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
              
                <img
                  src="/src/assets/members/arm.jpg"
                  alt="Arm"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Arm</p>
              
            </CardDeal>
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
             
                <img
                  src="/src/assets/members/job.jpg"
                  alt="Job"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Job</p>
              
            </CardDeal>
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
              
                <img
                  src="/src/assets/members/mark.jpg"
                  alt="Mark"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Mark</p>
             
            </CardDeal>
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
              
                <img
                  src="/src/assets/members/win.jpg"
                  alt="Win"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Win</p>
              
            </CardDeal>
            <CardDeal className="bg-[#F4F4F4] overflow-hidden transform transition-transform duration-300 hover:scale-105 my-15">
              
                <img
                  src="/src/assets/members/ton.jpg"
                  alt="Ton"
                  className="w-full h-full object-cover"
                />
                <p className="mx-auto p-3 text-center mt-3">Ton</p>
              
            </CardDeal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
