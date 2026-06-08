"use client";

import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";

const SwaggerPage = () => {
    return(
        <div>
            <SwaggerUI url="/api/swagger" />
        </div>
    );
};

export default SwaggerPage;