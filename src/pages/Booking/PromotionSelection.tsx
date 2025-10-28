import React, { useEffect, useState } from "react";
//import { getPromotionById } from "../../services/promotion/promotionServices";
import type { Promotion } from "../../types/promotion";
import { useParams } from "react-router-dom";

const PromotionSelection: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [promotion, setPromotion] = useState<Promotion | null>(null);

    useEffect(() => {
        if (id) {
            //getPromotionById(id).then(setPromotion);
            setPromotion({} as Promotion); // Placeholder until service is implemented
        }
    }, [id]);

    if (!promotion) return <p className="text-center text-white">Loading...</p>;

    return (
        <div className="w-full py-10 px-6 md:px-20 text-white flex flex-col md:flex-row gap-10">
            {/* Left: Description */}
            <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 uppercase">
                    {promotion.title}
                </h1>
                <div
                    className="text-base leading-7 space-y-4"
                    dangerouslySetInnerHTML={{ __html: promotion.description }}
                />
            </div>

            {/* Right: Image */}
            <div className="w-full md:w-[40%] flex justify-center">
                <img
                    src={promotion.imageUrl}
                    alt={promotion.title}
                    className="rounded-xl w-full object-cover"
                />
            </div>
        </div>
    );
};

export default PromotionSelection;
