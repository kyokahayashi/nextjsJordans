import { NextRequest, NextResponse } from "next/server";

const config = {
  matcher: [
    "/",
    "/index",
    "/[id]",
    "/signup",
    "/cart",
    "/contact",
    "/contact?comfirm=1",
    "/login/loginPage",
    "/mypage",
    "/mypage/userimfo",
    "/mypage/userimfo/useredit",
    "/purchase",
    "/purchase?comfirm=1",
    "/settlement",
    "/signup",
  ],
};

const middleware = (req: NextRequest) => {
  const authBasic = req.headers.get("authorization");
  const url = req.nextUrl;

  if (authBasic) {
    const [_, val] = authBasic.split(" ");
    const [user, pass] = atob(val).split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      pass === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  url.pathname = "/api/auth-basic";

  return NextResponse.rewrite(url);
};

export { config, middleware };
