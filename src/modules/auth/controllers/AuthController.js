
class AuthController {
  async execute(req, res) {

    return res.json({
      success: true
    })
  }
}

export default new AuthController();