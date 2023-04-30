import React,{useState} from 'react'
import {
  TheContent,
  RecruitMainSidebar,
  TheHeader
} from './index'

const RecruitMainLayout = () => {
  const [mounted, setMounted] = useState(false);

  const OnChildMount = () => {
    setMounted(true);
  };
  return (
    <div className="c-app c-default-layout">
      <RecruitMainSidebar onMount={OnChildMount} />
      {mounted && (
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
        </div>
      )}
    </div>
  )
}

export default RecruitMainLayout
