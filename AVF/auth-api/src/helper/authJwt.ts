export default async function authJwt(inputArguments: any) {
    const { jwtService, userService, token } = inputArguments;

    let user = jwtService.verify(token);
  
    user = userService.findOne({
      where: {
        email: user.email,
        password: user.password
      },
    });
  
    if (!user) {
      return { token: false };
    }
  
    return user;
}

