import { Header, Footer, ProtectedRoute } from 'app/components/elements'
import { USERTYPES } from 'app/types'

const MainLayout = ({
  children,
  completeFooter = false,
  requiresLogin,
  redirectUrl,
  allowedUserTypes,
}: {
  children: React.ReactNode
  completeFooter?: boolean
  requiresLogin?: boolean
  allowedUserTypes: USERTYPES[]
  redirectUrl?: string
}) => {
  if (requiresLogin) {
    return (
      <ProtectedRoute
        allowedUserTypes={allowedUserTypes}
        redirectUrl={redirectUrl}
      >
        <Header />
        {children}
        <Footer withSignUpPromotion={completeFooter} />
      </ProtectedRoute>
    )
  }

  return (
    <>
      <Header />
      {children}
      <Footer withSignUpPromotion={completeFooter} />
    </>
  )
}

export default MainLayout
