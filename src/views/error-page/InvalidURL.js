/**
 * URL STATE ERROR
 *
 * @author  Nay Zaw Linn
 * @create  09/06/2022 (D/M/Y)
 * @param
 * @return
 */
import React from 'react';
import {
	CImg,
	CButton,
	CCol,
	CContainer,
	CRow,
	CLabel
} from '@coreui/react';
import { useHistory } from "react-router-dom";



const InvalidURL = () => {
	
	const styles = {
		button: {
			background: '#7582FF',
			color: 'white',
		},
	}

	let history = useHistory();



	return(
		<CContainer className='d-flex align-items-center min-vh-100 justify-content-center bg-white'>
			<CRow className='text-center flex-md-row flex-sm-column'>
				<CCol lg='6'>
					<CImg className='selector' src='/image/invalidURL.svg' width={250} />
				</CCol>

				<CCol lg='6' className='text-center text-lg-left mt-5 mt-lg-0 d-flex flex-column'>
					<CLabel className='font-xl mb-4'>
						Sorry, this page isn't availabe.
					</CLabel>
					<CLabel className='font-xs mb-3'>
						Uh Oh, we can't seem to find the page you're looking for. Try going back to the previous page.
					</CLabel>
					<CCol lg='4' xs='4' className='mt-auto p-0 d-flex align-items-end align-self-center align-self-lg-start'>
						<CButton
							size='lg'
							style={styles.button}
							className='d-flex align-items-center'
							block
							onClick={() => history.goBack()}
						>
							<i className="fa fa-arrow-left"></i>
							<span className='font-xs m-auto'>Back</span>
						</CButton>
					</CCol>
				</CCol>
			</CRow>
		</CContainer>
	)
}

export default InvalidURL