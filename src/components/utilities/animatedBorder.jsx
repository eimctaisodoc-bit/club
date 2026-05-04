import React from "react";
import styled from "styled-components";

export const AnimatedBorder = ({ children, onClick }) => {
    return (
        <button className="premium-btn" onClick={onClick}>
            <span className="bef lg:h-[42px] md:h-[39px] h-[36px] px-7 lg:px-8">
                {children}
            </span>
        </button>
    );
};

