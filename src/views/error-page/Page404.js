/**
 * 404 page
 *
 * @author  Nay Zaw Linn
 * @create  08/06/2022 (D/M/Y)
 * @param
 * @return
 */

import React from "react";
import {
	CCol,
	CContainer,
	CRow,
	CImg,
	CLabel,
} from "@coreui/react";

const Page404 = () => {
	return (
		<CContainer className='d-flex align-items-center min-vh-100 justify-content-center bg-white'>
			<CRow className='text-center'>
				<CCol lg='12'>
					<CImg className='selector' src='/image/404.svg' width={400} />
				</CCol>
				<CCol lg='12' className='mt-5 mb-4'>
					<CLabel className='font-xl'>NOT FOUND!</CLabel>
				</CCol>
				<CCol lg='12'>
					<CLabel className='font-xs'>The resource requested could not be found on this server</CLabel>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default Page404;
