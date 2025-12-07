package cz.netix.netixbackend.model;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDateTime;

public class UserTest {
	@Test
	public void User() {
		User expected = new User(123L, "abc", "abc");
		User actual = new User();

		assertEquals(expected, actual);
	}

	@Test
	public void UserTODO() {
		User expected = new User(123L, "abc", "abc");
		User actual = new User();

		assertEquals(expected, actual);
	}

	@Test
	public void getCreatedAt() {
		User u = new User(123L, "abc", "abc");
		LocalDateTime expected = null;
		LocalDateTime actual = u.getCreatedAt();

		assertEquals(expected, actual);
	}
}
