import Recipe from "./Recipe";

const { REACT_APP_API_ORIGIN: ORIGIN } = process.env;

export default class UserController {
  static async create(user) {
    const res = await fetch(`${ORIGIN}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (json.data?.password) {
      delete json.data.password;
    }

    return json;
  }

  static async login(user) {
    const res = await fetch(`${ORIGIN}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (json.data?.password) {
      delete json.data.password;
    }

    return json;
  }

  static async update(userData, user) {
    const res = await fetch(`${ORIGIN}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...userData }),
    });

    const json = await res.json();

    return json;
  }

  static async getRecipes() {
    const res = await fetch(`${ORIGIN}/api/recipes`, {
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async getRecipe(recipeId) {
    const res = await fetch(`${ORIGIN}/api/recipes/${recipeId}`, {
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async getFromToken() {
    const res = await fetch(`${ORIGIN}/api/users/self`, {
      credentials: "include",
    });

    const json = await res.json();

    if (json.data?.password) delete json.data.password;

    return json;
  }

  static async saveRecipe(recipe, user) {
    const { id: userId } = user;

    const formattedRecipe = Recipe.prepareForExport(recipe, userId);

    const res = await fetch(`${ORIGIN}/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedRecipe),
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async updateRecipe(recipe, recipeId) {
    const formattedRecipe = Recipe.prepareForExport(recipe);

    const res = await fetch(`${ORIGIN}/api/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedRecipe),
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async deleteRecipe(recipeId) {
    const res = await fetch(`${ORIGIN}/api/recipes/${recipeId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }

  static async deleteUser(userId) {
    const res = await fetch(`${ORIGIN}/api/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    return json;
  }
}
