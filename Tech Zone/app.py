from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


with app.app_context():
    db.create_all()


# ---------------- HOME ---------------- #

@app.route("/")
def home():
    return render_template("index.html")


# ---------------- PRODUCTS ---------------- #

@app.route("/products")
def products():
    return render_template("products.html")


# ---------------- CART ---------------- #

@app.route("/cart")
def cart():
    return render_template("cart.html")


# ---------------- CHECKOUT ---------------- #

@app.route("/checkout")
@login_required
def checkout():
    return render_template("checkout.html")


# ---------------- REGISTER ---------------- #

@app.route("/register", methods=["GET", "POST"])
def register():

    if current_user.is_authenticated:
        return redirect(url_for("profile"))

    if request.method == "POST":

        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        existing_user = User.query.filter_by(email=email).first()

        if existing_user:

            flash("Email already exists!", "danger")

            return redirect(url_for("register"))

        hashed_password = generate_password_hash(password)

        new_user = User(

            username=username,

            email=email,

            password=hashed_password

        )

        db.session.add(new_user)
        db.session.commit()

        flash("Account created successfully!", "success")

        return redirect(url_for("login"))

    return render_template("register.html")


# ---------------- LOGIN ---------------- #

@app.route("/login", methods=["GET", "POST"])
def login():

    if current_user.is_authenticated:
        return redirect(url_for("profile"))

    if request.method == "POST":

        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):

            login_user(user)

            flash("Welcome back!", "success")

            return redirect(url_for("profile"))

        flash("Invalid email or password.", "danger")

    return render_template("login.html")


# ---------------- LOGOUT ---------------- #

@app.route("/logout")
@login_required
def logout():

    logout_user()

    flash("You have been logged out.", "info")

    return redirect(url_for("home"))


# ---------------- PROFILE ---------------- #

@app.route("/profile")
@login_required
def profile():

    return render_template(

        "profile.html",

        user=current_user

    )


# ---------------- ADMIN ---------------- #

@app.route("/admin")
@login_required
def admin():

    if not current_user.is_admin:

        flash("Access denied.", "danger")

        return redirect(url_for("home"))

    return render_template("admin.html")


# ---------------- 404 ---------------- #

@app.errorhandler(404)
def page_not_found(error):

    return render_template("404.html"), 404


if __name__ == "__main__":

    app.run(debug=True)