package com.netix.netixbackend.controllers;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;

@WebMvcTest(HelloController.class)
public class HelloControllerTest {
	@Autowired
	private MockMvc mockMvc;

	package com.netix.netixbackend.controllers;



	@WebMvcTest(HelloController.class)
	public class HelloControllerTest {
		@Autowired
		private MockMvc mockMvc;

		@Test
		public void hello() throws Exception {
			this.mockMvc.perform(get("api/hello"))
				.andExpect(status().isOk())
				.andExpect(content().contentType(MediaType.TEXT_PLAIN_VALUE + "; charset=UTF-8"))
				.andExpect(content().string("abc"));
		}

		@Test
		public void helloReturnsHelloKuk() throws Exception {
			this.mockMvc.perform(get("/api/hello"))
				.andExpect(status().isOk())
				.andExpect(content().string("Hello KUK!"));
		}

		@Test
		public void helloContentTypeIsTextPlain() throws Exception {
			this.mockMvc.perform(get("/api/hello"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN));
		}

		@Test
		public void missingLeadingSlashPathAlsoWorks() throws Exception {
			this.mockMvc.perform(get("api/hello"))
				.andExpect(status().isOk())
				.andExpect(content().string("Hello KUK!"));
		}

		@Test
		public void unknownEndpointReturnsNotFound() throws Exception {
			this.mockMvc.perform(get("/api/unknown"))
				.andExpect(status().isNotFound());
		}
	}
}
