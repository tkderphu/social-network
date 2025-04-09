package viosmash.db;

import viosmash.nodes.User;

import java.util.ArrayList;
import java.util.List;

public class UserTable {
    public static final List<User> USER_TABLES = new ArrayList<>(List.of(
            new User(1l),
            new User(2l),
            new User(3l),
            new User(4l),
            new User(5l)
    ));
}
