/**
 * 403 page
 *
 * @author  Nay Zaw Linn
 * @create  10/06/2022 (D/M/Y)
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

const Page403 = () => {
	return (
		<CContainer className='d-flex align-items-center min-vh-100 justify-content-center bg-white'>
			<CRow className='text-center'>
				<CCol lg='12'>
					<CImg className='selector' src='/image/403.svg' width='100%' />
				</CCol>
				<CCol lg='12'>
					<CLabel className='font-lg'>
						Forbidden, accessing the page or resource you were trying to reach is absolutely forbidden for some reason
					</CLabel>
				</CCol>
			</CRow>
		</CContainer>
	);
};

export default Page403;
