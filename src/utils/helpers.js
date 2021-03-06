export function fullNameOrEmail(user) {
  if (user.first_name) {
    return `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`;
  }
  if (user.last_name) {
    return user.last_name;
  }
  return user.email;
}

export function nameOrEmail(user) {
  if (user.first_name) {
    return user.first_name;
  }
  if (user.last_name) {
    return user.last_name;
  }
  return user.email;
}
